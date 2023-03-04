import EModelTypes from '../EModelTypes';
import Model from '../Model';

export default abstract class TestStep extends Model {
    private _name: string;

    protected constructor(defaultName: string) {
        super(EModelTypes.TestStep);
        this.name = defaultName;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        if (name.length > 0) {
            this._name = name;
        }
    }
}
