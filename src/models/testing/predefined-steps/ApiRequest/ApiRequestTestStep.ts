import EModelTypes from '../../../EModelTypes';
import EHttpMethod from '../../../common/http/EHttpMethods';
import TestStep, { type ITestStep } from '../../TestStep';
import RequestBody from '../../../common/http/RequestBody';
import { type IRequestBody } from '../../../common/http/RequestBody';

export interface IApiRequestTestStep extends ITestStep {
    method: EHttpMethod;
    endpointId: string;
    headers: Array<Record<string, string>>;
    cookies: Array<Record<string, string>>;
    body: IRequestBody;
}

export default class ApiRequestTestStep extends TestStep {
    private _method: EHttpMethod = EHttpMethod.GET;
    private _endpointId: string;
    private _headers: Array<Record<string, string>> = [];
    private _cookies: Array<Record<string, string>> = [];
    private _body: RequestBody;

    /**
     * Create a new API request test step
     * @param parentId Parent test case id
     * @param name Name of the test step
     * @param endpointId API endpoint ID
     */
    public constructor(parentId: string, name: string, endpointId: string) {
        super(EModelTypes.ApiRequestTestStep, name, parentId);
        this.endpointId = endpointId;
    }

    public static fromObject(apiRequestTestStepObject: IApiRequestTestStep): ApiRequestTestStep {
        const apiRequestTestStep = new ApiRequestTestStep(apiRequestTestStepObject.parentId, apiRequestTestStepObject.name, apiRequestTestStepObject.endpointId);
        apiRequestTestStep.fromObject(apiRequestTestStepObject);
        apiRequestTestStep.method = apiRequestTestStepObject.method;
        apiRequestTestStep.headers = apiRequestTestStepObject.headers;
        apiRequestTestStep.cookies = apiRequestTestStepObject.cookies;
        apiRequestTestStep.body = RequestBody.fromObject(apiRequestTestStepObject.body);

        return apiRequestTestStep;
    }

    public toObject(): IApiRequestTestStep {
        return {
            ...super.toObject(),
            method: this.method,
            endpointId: this.endpointId,
            headers: this.headers,
            cookies: this.cookies,
            body: this.body.toObject()
        };
    }

    public get method(): EHttpMethod {
        return this._method;
    }

    public set method(method: EHttpMethod) {
        this._method = method;
    }

    public get endpointId(): string {
        return this._endpointId;
    }

    public set endpointId(endpoint: string) {
        this._endpointId = endpoint;
    }

    public get headers(): Array<Record<string, string>> {
        return this._headers;
    }

    public set headers(headers: Array<Record<string, string>>) {
        this._headers = headers;
    }

    public get cookies(): Array<Record<string, string>> {
        return this._cookies;
    }

    public set cookies(cookies: Array<Record<string, string>>) {
        this._cookies = cookies;
    }

    public get body(): RequestBody {
        return this._body;
    }

    public set body(body: RequestBody) {
        this._body = body;
    }

    public clone(): ApiRequestTestStep {
        const apiRequestTestStep = new ApiRequestTestStep(this.parentId, this.name, this.endpointId);
        return apiRequestTestStep;
    }
}
