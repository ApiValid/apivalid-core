import EModelTypes from '../models/EModelTypes';
import ApiRequestTestStep from '../models/testing/predefined-steps/ApiRequest/ApiRequestTestStep';
import type TestStep from '../models/testing/TestStep';

/**
 * Test steps collection manager
 */
export default class TestStepsController {
    private readonly _testSteps: TestStep[] = [];

    /**
     * Use {@link TestStepsController.initTestSteps} to initialize test suites collection and get an instance
     */
    private constructor() {}

    /**
     * Initialize test suites collection from objects array
     * @param testStepsObjects Objects array to initialize test suites collection
     * @returns Test steps collection manager instance
     */
    public static initTestSteps(testStepsObjects: any[] = []): TestStepsController {
        const instance = new TestStepsController();
        instance._testSteps.push(...testStepsObjects.map(t => {
            switch (t.type) {
                case EModelTypes.ApiRequestTestStep:
                    return ApiRequestTestStep.fromObject(t);
                default:
                    throw new Error('Test step has broken data');
            }
        }));

        return instance;
    }

    /**
     * Create a new test suite with optional name and description
     * @param name Name of the test suite
     * @param description Description of the test suite
     * @returns Test step instance
     */
    public addTestStep(testStep: TestStep): void {
        this._testSteps.push(testStep);
    }

    /**
     * Get test suites instance by their ids
     * @param ids Test step ids
     * @returns Test step instances
     */
    public getTestStepByIds(...ids: string[]): TestStep[] {
        return this._testSteps.filter((testStep) => ids.includes(testStep.id));
    }

    /**
     * Get test suite instance by its id
     * @param id Test step id
     * @returns Test step instance
     */
    public getTestStepById(id: string): TestStep {
        const testStep = this._testSteps.find((testStep) => testStep.id === id);
        if (!testStep) {
            throw new Error(`Test step with id "${id}" not found`);
        }

        return testStep;
    }

    /**
     * Remove a test suite by its id
     * @param id Test step id
     */
    public removeTestStepById(id: string): void {
        const index = this._testSteps.findIndex((testStep) => testStep.id === id);
        if (index === -1) {
            throw new Error(`Test step with id "${id}" not found`);
        }

        this._testSteps.splice(index, 1);
    }

    /**
     * Make a copy of a test suite instance.
     * The copy will have a new id and a name with the suffix " - copy"
     * @param id Test step id
     */
    public cloneTestStepById(id: string): TestStep {
        const testStep = this.getTestStepById(id);
        const clonedTestStep = testStep.clone();
        clonedTestStep.name = clonedTestStep.name + ' - copy';

        this._testSteps.push(clonedTestStep);

        return clonedTestStep;
    }
}
