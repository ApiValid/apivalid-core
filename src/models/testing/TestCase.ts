import EModelTypes from '../EModelTypes';
import Model, { type IModel } from '../Model';

export interface ITestCase extends IModel {
    name: string;
    description: string;
    parentId: string;
}

export default class TestCase extends Model {
    private _name: string;
    private _description: string;
    private _parentId: string;

    constructor(name: string, description: string, parentId: string) {
        super(EModelTypes.TestCase);
        this.name = name;
        this.description = description;
        this.parentId = parentId;
    }

    public static fromObject(testCaseObject: ITestCase): TestCase {
        const testCase = new TestCase(testCaseObject.name, testCaseObject.description, testCaseObject.parentId);
        testCase.fromObject(testCaseObject);

        return testCase;
    }

    public toObject(): ITestCase {
        return {
            ...super.toObject(),
            name: this._name,
            description: this._description,
            parentId: this._parentId
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

    public get parentId(): string {
        return this._parentId;
    }

    private set parentId(parentId: string) {
        this._parentId = parentId;
    }

    public clone(): TestCase {
        const testCase = new TestCase(this.name, this.description, this.parentId);

        return testCase;
    }
}
