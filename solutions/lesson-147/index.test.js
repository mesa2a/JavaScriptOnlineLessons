import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Lesson 147: データ構造設計 (Solution)', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    const html = fs.readFileSync(
      path.resolve(__dirname, 'index.html'),
      'utf-8'
    );
    const js = fs.readFileSync(
      path.resolve(__dirname, 'script.js'),
      'utf-8'
    );

    dom = new JSDOM(html, {
      runScripts: 'outside-only',
      resources: 'usable'
    });
    document = dom.window.document;
    window = dom.window;

    // JavaScriptを実行
    const scriptEl = document.createElement('script');
    scriptEl.textContent = js;
    document.body.appendChild(scriptEl);
  });

  describe('UI要素', () => {
    it('すべての入力欄が存在する', () => {
      expect(document.getElementById('appName')).not.toBeNull();
      expect(document.getElementById('description')).not.toBeNull();
      expect(document.getElementById('entityList')).not.toBeNull();
      expect(document.getElementById('relationships')).not.toBeNull();
      expect(document.getElementById('storageMethod')).not.toBeNull();
      expect(document.getElementById('storageKey')).not.toBeNull();
      expect(document.getElementById('output')).not.toBeNull();
    });
  });

  describe('初期状態', () => {
    it('サンプルデータが読み込まれている', () => {
      const appName = document.getElementById('appName').value;
      expect(appName).not.toBe('');
      expect(appName).toContain('家計簿');
    });

    it('エンティティが複数定義されている', () => {
      const entities = window.eval('entities');
      expect(entities.length).toBeGreaterThan(0);
    });
  });

  describe('addEntity関数', () => {
    it('新しいエンティティを追加できる', () => {
      window.eval('entities = []');
      window.eval('entityIdCounter = 1');

      const entities = window.eval('entities');
      const initialLength = entities.length;

      window.eval('addEntity("テストエンティティ")');

      expect(entities.length).toBe(initialLength + 1);
    });

    it('追加されたエンティティが正しい構造を持つ', () => {
      window.eval('entities = []');
      window.eval('entityIdCounter = 1');

      const entity = window.eval('addEntity("テスト")');

      expect(entity).toHaveProperty('id');
      expect(entity).toHaveProperty('name');
      expect(entity).toHaveProperty('fields');
      expect(Array.isArray(entity.fields)).toBe(true);
    });

    it('IDが自動的に割り当てられる', () => {
      window.eval('entities = []');
      window.eval('entityIdCounter = 1');

      const entity1 = window.eval('addEntity("エンティティ1")');
      const entity2 = window.eval('addEntity("エンティティ2")');

      expect(entity1.id).toBe(1);
      expect(entity2.id).toBe(2);
    });
  });

  describe('deleteEntity関数', () => {
    it('エンティティを削除できる', () => {
      window.eval('entities = []');
      window.eval('entityIdCounter = 1');

      const entity = window.eval('addEntity("削除テスト")');
      const entities = window.eval('entities');
      const initialLength = entities.length;

      window.eval('deleteEntity(' + entity.id + ')');

      expect(entities.length).toBe(initialLength - 1);
    });
  });

  describe('getEntityById関数', () => {
    it('IDでエンティティを取得できる', () => {
      window.eval('entities = []');
      window.eval('entityIdCounter = 1');

      const entity = window.eval('addEntity("取得テスト")');
      const retrieved = window.eval('getEntityById(' + entity.id + ')');

      expect(retrieved).not.toBeNull();
      expect(retrieved.name).toBe('取得テスト');
    });

    it('存在しないIDの場合nullを返す', () => {
      const result = window.eval('getEntityById(99999)');
      expect(result).toBeNull();
    });
  });

  describe('addField関数', () => {
    it('エンティティにフィールドを追加できる', () => {
      window.eval('entities = []');
      window.eval('entityIdCounter = 1');
      window.eval('fieldIdCounter = 1');

      const entity = window.eval('addEntity("テスト")');
      window.eval('addField(' + entity.id + ', "testField", "string", "説明")');

      expect(entity.fields.length).toBe(1);
      expect(entity.fields[0].name).toBe('testField');
    });

    it('追加されたフィールドが正しい構造を持つ', () => {
      window.eval('entities = []');
      window.eval('entityIdCounter = 1');
      window.eval('fieldIdCounter = 1');

      const entity = window.eval('addEntity("テスト")');
      const field = window.eval('addField(' + entity.id + ', "id", "number", "識別子")');

      expect(field).toHaveProperty('id');
      expect(field).toHaveProperty('name');
      expect(field).toHaveProperty('type');
      expect(field).toHaveProperty('description');
    });
  });

  describe('deleteField関数', () => {
    it('フィールドを削除できる', () => {
      window.eval('entities = []');
      window.eval('entityIdCounter = 1');
      window.eval('fieldIdCounter = 1');

      const entity = window.eval('addEntity("テスト")');
      window.eval('addField(' + entity.id + ', "field1", "string", "")');
      window.eval('addField(' + entity.id + ', "field2", "number", "")');

      expect(entity.fields.length).toBe(2);

      window.eval('deleteField(' + entity.id + ', 0)');

      expect(entity.fields.length).toBe(1);
    });
  });

  describe('updateField関数', () => {
    it('フィールドのプロパティを更新できる', () => {
      window.eval('entities = []');
      window.eval('entityIdCounter = 1');
      window.eval('fieldIdCounter = 1');

      const entity = window.eval('addEntity("テスト")');
      window.eval('addField(' + entity.id + ', "oldName", "string", "")');
      window.eval('updateField(' + entity.id + ', 0, "name", "newName")');

      expect(entity.fields[0].name).toBe('newName');
    });
  });

  describe('generateDataStructure関数', () => {
    it('データ設計書を生成できる', () => {
      document.getElementById('appName').value = "テストアプリ";

      window.eval('generateDataStructure()');

      const output = document.getElementById('output').textContent;
      expect(output).toContain('テストアプリ');
      expect(output).toContain('データ設計書');
    });

    it('エンティティ情報が含まれる', () => {
      window.eval('entities = []');
      window.eval('entityIdCounter = 1');
      window.eval('fieldIdCounter = 1');

      const entity = window.eval('addEntity("ユーザー")');
      window.eval('addField(' + entity.id + ', "id", "number", "")');

      document.getElementById('appName').value = "テスト";

      window.eval('generateDataStructure()');

      const output = document.getElementById('output').textContent;
      expect(output).toContain('ユーザー');
    });

    it('統計情報が含まれる', () => {
      window.eval('generateDataStructure()');

      const output = document.getElementById('output').textContent;
      expect(output).toContain('統計情報');
      expect(output).toContain('エンティティ数');
    });
  });

  describe('generateSampleCode関数', () => {
    it('サンプルコードを生成できる', () => {
      window.eval('entities = []');
      window.eval('entityIdCounter = 1');
      window.eval('fieldIdCounter = 1');

      window.eval('addEntity("Task")');

      window.eval('generateSampleCode()');

      const output = document.getElementById('output').textContent;
      expect(output).toContain('let task');
      expect(output).toContain('サンプルコード');
    });

    it('CRUD関数が含まれる', () => {
      window.eval('entities = []');
      window.eval('entityIdCounter = 1');

      window.eval('addEntity("Item")');

      window.eval('generateSampleCode()');

      const output = document.getElementById('output').textContent;
      expect(output).toContain('addItem');
      expect(output).toContain('getItemById');
    });
  });

  describe('ヘルパー関数', () => {
    it('getSampleValue関数が正しい値を返す', () => {
      const stringValue = window.eval('getSampleValue("string")');
      const numberValue = window.eval('getSampleValue("number")');
      const booleanValue = window.eval('getSampleValue("boolean")');
      const arrayValue = window.eval('getSampleValue("array")');
      const objectValue = window.eval('getSampleValue("object")');

      expect(stringValue).toBe('"サンプル文字列"');
      expect(numberValue).toBe('100');
      expect(booleanValue).toBe('false');
      expect(arrayValue).toBe('[]');
      expect(objectValue).toBe('{}');
    });

    it('toCamelCase関数が正しく変換する', () => {
      const result = window.eval('toCamelCase("UserProfile")');
      expect(result.charAt(0)).toBe(result.charAt(0).toLowerCase());
    });

    it('capitalize関数が正しく変換する', () => {
      const result = window.eval('capitalize("test")');
      expect(result).toBe('Test');
    });
  });

  describe('loadSampleData関数', () => {
    it('サンプルデータが読み込まれる', () => {
      window.eval('entities = []');
      window.eval('entityIdCounter = 1');
      window.eval('fieldIdCounter = 1');

      window.eval('loadSampleData()');

      const entities = window.eval('entities');
      expect(entities.length).toBeGreaterThan(0);
    });

    it('支出エンティティが含まれる', () => {
      window.eval('entities = []');
      window.eval('entityIdCounter = 1');
      window.eval('fieldIdCounter = 1');

      window.eval('loadSampleData()');

      const entities = window.eval('entities');
      let foundExpense = false;

      for (let i = 0; i < entities.length; i++) {
        if (entities[i].name === '支出') {
          foundExpense = true;
          break;
        }
      }

      expect(foundExpense).toBe(true);
    });

    it('フィールドが正しく設定されている', () => {
      window.eval('entities = []');
      window.eval('entityIdCounter = 1');
      window.eval('fieldIdCounter = 1');

      window.eval('loadSampleData()');

      const entities = window.eval('entities');

      for (let i = 0; i < entities.length; i++) {
        expect(entities[i].fields.length).toBeGreaterThan(0);
      }
    });
  });

  describe('統合テスト', () => {
    it('エンティティ追加→フィールド追加→設計書生成のフローが動作する', () => {
      window.eval('entities = []');
      window.eval('entityIdCounter = 1');
      window.eval('fieldIdCounter = 1');

      const entity = window.eval('addEntity("Product")');
      window.eval('addField(' + entity.id + ', "name", "string", "商品名")');
      window.eval('addField(' + entity.id + ', "price", "number", "価格")');

      document.getElementById('appName').value = "統合テスト";

      window.eval('generateDataStructure()');

      const output = document.getElementById('output').textContent;
      expect(output).toContain('統合テスト');
      expect(output).toContain('Product');
      expect(output).toContain('name');
      expect(output).toContain('price');
    });
  });
});
