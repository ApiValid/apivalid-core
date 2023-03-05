import EModelTypes from '../../EModelTypes';
import Model, { type IModel } from '../../Model';
import ERequestContentTypes from './ERequestContentTypes';

export interface IRequestBody extends IModel {
    contentType: ERequestContentTypes;
    body: Map<string, any>;
}

export default class RequestBody extends Model {
    private _contentType: ERequestContentTypes;
    private _body = new Map<string, any>();

    protected constructor(contentType: ERequestContentTypes) {
        super(EModelTypes.RequestBody);
        this.contentType = contentType;
    }

    public static fromObject(requestBodyObject: IRequestBody): RequestBody {
        const requestBody = new RequestBody(requestBodyObject.contentType);
        Object.entries(requestBodyObject.body).forEach((bodyRecord) => {
            requestBody.addBodyRecord({ key: bodyRecord[0], value: bodyRecord[1] });
        });

        return requestBody;
    }

    public toObject(): IRequestBody {
        return {
            ...super.toObject(),
            contentType: this._contentType,
            body: this._body
        };
    }

    public get contentType(): ERequestContentTypes {
        return this._contentType;
    }

    public set contentType(contentType: ERequestContentTypes) {
        this._contentType = contentType;
    }

    private get body(): Map<string, any> {
        return this._body;
    }

    private set body(body: Map<string, any>) {
        this._body = body;
    }

    public addBodyRecord(...entry: Array<{ key: string, value: any }>): void {
        entry.forEach((bodyRecord) => {
            this.body.set(bodyRecord.key, bodyRecord.value);
        });
    }

    public removeBodyRecordByKey(key: string): void {
        this.body.delete(key);
    }

    public clone(): RequestBody {
        const requestBody = new RequestBody(this.contentType);
        requestBody.body = new Map(this.body);

        return requestBody;
    }

    public toString(): string {
        switch (this.contentType) {
            case ERequestContentTypes.JSON:
                return JSON.stringify(this.body, null, 4);
            case ERequestContentTypes.FORM:
            {
                const tmpBody = new URLSearchParams();
                this.body.forEach((bodyRecord) => {
                    tmpBody.append(bodyRecord.key, bodyRecord.value);
                });

                return tmpBody.toString();
            }
            default:
                return '';
        }
    }
}
