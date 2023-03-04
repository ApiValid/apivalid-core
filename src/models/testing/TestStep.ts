import type EModelTypes from '../EModelTypes';
import Model, { type IModel } from '../Model';

export interface ITestStep extends IModel {
    name: string;
    parentId: string;
}

export default abstract class TestStep extends Model {
    private _name: string;
    private _parentId: string;

    protected constructor(type: EModelTypes, defaultName: string, parentId: string) {
        super(type);
        this.name = defaultName;
        this.parentId = parentId;
    }

    public toObject(): ITestStep {
        return {
            ...super.toObject(),
            name: this._name,
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

    public get parentId(): string {
        return this._parentId;
    }

    private set parentId(parentId: string) {
        this._parentId = parentId;
    }

    public abstract clone(): TestStep;
}
