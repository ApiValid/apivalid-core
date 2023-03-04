import type EModelTypes from './EModelTypes';
import { v4 as uuid, validate as uuidValidate } from 'uuid';

export interface IModel {
    id: string;
    type: EModelTypes;
}

export default abstract class Model {
    private _id: string;
    private _type: EModelTypes;

    protected constructor(type: EModelTypes) {
        this.setRandomId();
        this.type = type;
    }

    public get id(): string {
        return this._id;
    }

    public set id(id: string) {
        if (uuidValidate(id)) {
            this._id = id;
        } else {
            throw new Error(`Invalid UUID: ${id}`);
        }
    }

    public static fromObject(object: IModel): Model {
        throw new Error('Not implemented');
    }

    protected fromObject(object: IModel): void {
        this.id = object.id;
        this.type = object.type;
    }

    public setRandomId(): void {
        this.id = uuid();
    }

    public get type(): EModelTypes {
        return this._type;
    }

    private set type(type: EModelTypes) {
        this._type = type;
    }

    protected toObject(): IModel {
        return {
            id: this.id,
            type: this.type
        };
    }

    public abstract clone(): Model;
}
