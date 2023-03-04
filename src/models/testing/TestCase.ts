import EModelTypes from '../EModelTypes';
import Model, { type IModel } from '../Model';

export interface ITestCase extends IModel {
    name: string;
    description: string;
}

export default class TestCase extends Model {
    private _name: string;
    private _description: string;

    private readonly _testSteps: string[] = [];

    constructor() {
        super(EModelTypes.TestCase);
    }

    public static fromObject(testCaseObject: ITestCase): TestCase {
        const testCase = new TestCase();
        testCase.name = testCaseObject.name;
        testCase.description = testCaseObject.description;

        return testCase;
    }

    public toObject(): ITestCase {
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

    public get testSteps(): string[] {
        return this._testSteps;
    }

    public addTestStep(...id: string[]): void {
        this._testSteps.push(...id);
    }

    public removeTestStep(id: string): void {
        const index = this._testSteps.findIndex((testStep) => testStep === id);
        if (index === -1) {
            throw new Error(`Test step with id ${id} not found`);
        }

        this._testSteps.splice(index, 1);
    }
}
