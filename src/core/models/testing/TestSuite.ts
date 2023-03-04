import EModelTypes from '../EModelTypes';
import Model, { type IModel } from '../Model';

export interface ITestSuite extends IModel {
    name: string;
    description: string;
}

export default class TestSuite extends Model {
    private _name: string;
    private _description: string;

    private readonly _testCases: string[] = [];

    constructor() {
        super(EModelTypes.TestSuite);
    }

    public static fromObject(testSuiteObject: ITestSuite): TestSuite {
        const testSuite = new TestSuite();
        testSuite.name = testSuiteObject.name;
        testSuite.description = testSuiteObject.description;

        return testSuite;
    }

    public toObject(): ITestSuite {
        return {
            ...super.toObject(),
            name: this._name,
            description: this._description
        };
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        if (name.length > 0) {
            this._name = name;
        }
    }

    public get description(): string {
        return this._description;
    }

    public set description(description: string) {
        this._description = description;
    }

    public get testCases(): string[] {
        return this._testCases;
    }

    public addTestCase(...id: string[]): void {
        this._testCases.push(...id);
    }

    public removeTestCase(id: string): void {
        const index = this._testCases.findIndex((testCase) => testCase === id);
        if (index === -1) {
            throw new Error(`Test case with id ${id} not found`);
        }

        this._testCases.splice(index, 1);
    }
}
