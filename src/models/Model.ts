import type EModelTypes from './EModelTypes';
import { v4 as uuid, validate as uuidValidate } from 'uuid';

export interface IModel {
    id: string;
    type: EModelTypes;
}

export default abstract class Model {
    private _id: string;
    private readonly _type: EModelTypes;

    protected constructor(type: EModelTypes) {
        this.setRandomId();
        this._type = type;
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

    public setRandomId(): void {
        this.id = uuid();
    }

    public get type(): EModelTypes {
        return this._type;
    }

    protected toObject(): IModel {
        return {
            id: this.id,
            type: this.type
        };
    }
}
