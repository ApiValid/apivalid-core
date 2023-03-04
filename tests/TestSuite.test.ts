import TestSuite, { type ITestSuite } from '../src/models/testing/TestSuite';
import { v4 as uuid, validate as uuidValidate } from 'uuid';
import TestSuitesController from '../src/controllers/TestSuitesController';
import EModelTypes from '../src/models/EModelTypes';

const TestSuiteId = uuid();
const TestSuiteType = EModelTypes.TestSuite;
const TestSuiteName = 'Test Suite';
const TestSuiteDescription = 'This is a description of\nthe test suite';
const ClonedTestSuiteName = TestSuiteName + ' - copy';

const TestSuiteObject: ITestSuite = {
    id: TestSuiteId,
    type: TestSuiteType,
    name: TestSuiteName,
    description: TestSuiteDescription
};

const TestSuiteName2 = 'Test Suite 2';
const TestSuiteDescription2 = 'This is a description of\nthe test suite 2';

describe('Test suite tests', () => {
    it('Create new test suite using constructor', () => {
        const testSuite = new TestSuite(TestSuiteName, TestSuiteDescription);
        expect(testSuite).toBeInstanceOf(TestSuite);
        expect(uuidValidate(testSuite.id)).toBe(true);
        expect(testSuite.type).toStrictEqual(TestSuiteType);
        expect(testSuite.name).toBe(TestSuiteName);
        expect(testSuite.description).toBe(TestSuiteDescription);
    });

    it('Create new test suite using controller', () => {
        const controller = TestSuitesController.initTestSuites();
        const testSuite = controller.createTestSuite(TestSuiteName, TestSuiteDescription);
        expect(testSuite).toBeInstanceOf(TestSuite);
        expect(uuidValidate(testSuite.id)).toBe(true);
        expect(testSuite.type).toStrictEqual(TestSuiteType);
        expect(testSuite.name).toBe(TestSuiteName);
        expect(testSuite.description).toBe(TestSuiteDescription);
    });

    it('Clone test suite using class', () => {
        const testSuite = new TestSuite(TestSuiteName, TestSuiteDescription);
        const clonedTestSuite = testSuite.clone();
        expect(clonedTestSuite).toBeInstanceOf(TestSuite);
        expect(uuidValidate(testSuite.id)).toBe(true);
        expect(testSuite.type).toStrictEqual(TestSuiteType);
        expect(clonedTestSuite.name).toBe(testSuite.name);
        expect(clonedTestSuite.description).toBe(TestSuiteDescription);
        expect(clonedTestSuite.id).not.toBe(testSuite.id);
    });

    it('Clone test suite using controller', () => {
        const controller = TestSuitesController.initTestSuites();
        const testSuite = controller.createTestSuite(TestSuiteName, TestSuiteDescription);
        const clonedTestSuite = controller.cloneTestSuiteById(testSuite.id);
        expect(clonedTestSuite).toBeInstanceOf(TestSuite);
        expect(uuidValidate(testSuite.id)).toBe(true);
        expect(testSuite.type).toStrictEqual(TestSuiteType);
        expect(clonedTestSuite.name).toBe(ClonedTestSuiteName);
        expect(clonedTestSuite.description).toBe(TestSuiteDescription);
        expect(clonedTestSuite.id).not.toBe(testSuite.id);
    });

    it('Serialize to object', () => {
        const testSuite = new TestSuite(TestSuiteName, TestSuiteDescription);
        testSuite.id = TestSuiteId;
        const object = testSuite.toObject();
        expect(object).toEqual(TestSuiteObject);
    });

    it('Unserialize from object', () => {
        const testSuite = TestSuite.fromObject(TestSuiteObject);
        expect(testSuite).toBeInstanceOf(TestSuite);
        expect(testSuite.id).toBe(TestSuiteId);
        expect(testSuite.type).toStrictEqual(TestSuiteType);
        expect(testSuite.name).toBe(TestSuiteName);
        expect(testSuite.description).toBe(TestSuiteDescription);
    });

    it('Get test suite by id', () => {
        const testSuite = new TestSuite(TestSuiteName, TestSuiteDescription);
        const controller = TestSuitesController.initTestSuites([testSuite]);
        const testSuite2 = controller.getTestSuiteById(testSuite.id);
        expect(testSuite2.toObject()).toStrictEqual(testSuite.toObject());
    });

    it('Get test suites by ids', () => {
        const testSuite1 = new TestSuite(TestSuiteName, TestSuiteDescription);
        const testSuite2 = new TestSuite(TestSuiteName2, TestSuiteDescription2);

        const controller = TestSuitesController.initTestSuites([testSuite1, testSuite2]);
        const testSuites = controller.getTestSuiteByIds(testSuite1.id, testSuite2.id);
        expect(testSuites).toHaveLength(2);
        expect(testSuites[0].toObject()).toStrictEqual(testSuite1.toObject());
        expect(testSuites[1].toObject()).toStrictEqual(testSuite2.toObject());
    });
});
