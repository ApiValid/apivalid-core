import type TestStep from '../models/TestStep';

export default class TestStepsController {
    private readonly _testSteps: TestStep[] = [];

    public loadTestSteps(testSteps: TestStep[]): void {
        this._testSteps.push(...testSteps);
    }

    public addTestStep(testStep: TestStep): void {
        this._testSteps.push(testStep);
    }

    public getTestStepById(id: string): TestStep {
        const testStep = this._testSteps.find((testStep) => testStep.id === id);
        if (!testStep) {
            throw new Error(`Test step with id ${id} not found`);
        }

        return testStep;
    }

    public removeTestStepById(id: string): void {
        const index = this._testSteps.findIndex((testStep) => testStep.id === id);
        if (index === -1) {
            throw new Error(`Test step with id ${id} not found`);
        }

        this._testSteps.splice(index, 1);
    }
}
