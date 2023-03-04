import EModelTypes from '../EModelTypes';
import Model, { type IModel } from '../Model';

export interface ITestSuite extends IModel {
    name: string;
    description: string;
}

export default class TestSuite extends Model {
    private _name: string;
    private _description: string;

    constructor(name: string, description: string) {
        super(EModelTypes.TestSuite);
        this.name = name;
        this.description = description;
    }

    public static fromObject(testSuiteObject: ITestSuite): TestSuite {
        const testSuite = new TestSuite(testSuiteObject.name, testSuiteObject.description);
        testSuite.fromObject(testSuiteObject);

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

    public clone(): TestSuite {
        const testSuite = new TestSuite(this.name, this.description);

        return testSuite;
    }
}
