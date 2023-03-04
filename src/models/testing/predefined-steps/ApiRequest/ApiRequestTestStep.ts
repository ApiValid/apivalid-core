import EModelTypes from '../../../EModelTypes';
import TestStep, { type ITestStep } from '../../TestStep';

export interface IApiRequestTestStep extends ITestStep {
}

export default class ApiRequestTestStep extends TestStep {
    public constructor(name: string, parentId: string) {
        super(EModelTypes.ApiRequestTestStep, name, parentId);
    }

    public static fromObject(apiRequestTestStepObject: IApiRequestTestStep): ApiRequestTestStep {
        const apiRequestTestStep = new ApiRequestTestStep(apiRequestTestStepObject.name, apiRequestTestStepObject.parentId);
        apiRequestTestStep.fromObject(apiRequestTestStepObject);

        return apiRequestTestStep;
    }

    public clone(): ApiRequestTestStep {
        const apiRequestTestStep = new ApiRequestTestStep(this.name, this.parentId);
        return apiRequestTestStep;
    }
}
