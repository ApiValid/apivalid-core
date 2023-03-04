import TestCase from '../models/testing/TestCase';

/**
 * Test cases collection manager
 */
export default class TestCasesController {
    private readonly _testCases: TestCase[] = [];

    /**
     * Use {@link TestCasesController.initTestCases} to initialize test cases collection and get an instance
     */
    private constructor() {}

    /**
     * Initialize test cases collection from objects array
     * @param testCasesObjects Objects array to initialize test cases collection
     * @returns Test cases collection manager instance
     */
    public static initTestCases(testCasesObjects: any[] = []): TestCasesController {
        const instance = new TestCasesController();
        instance._testCases.push(...testCasesObjects.map(t => TestCase.fromObject(t)));

        return instance;
    }

    /**
     * Create a new test case with optional name and description
     * @param name Name of the test case
     * @param description Description of the test case
     * @returns Test case instance
     */
    public createTestCase(name?: string, description?: string): TestCase {
        const testCase = new TestCase();
        testCase.name = name ?? 'Test Case';
        testCase.description = description ?? '';
        this._testCases.push(testCase);

        return testCase;
    }

    /**
     * Get test cases instance by their ids
     * @param ids Test case ids
     * @returns Test case instances
     */
    public getTestCaseByIds(...ids: string[]): TestCase[] {
        return this._testCases.filter((testCase) => ids.includes(testCase.id));
    }

    /**
     * Get test case instance by its id
     * @param id Test case id
     * @returns Test case instance
     */
    public getTestCaseById(id: string): TestCase {
        const testCase = this._testCases.find((testCase) => testCase.id === id);
        if (!testCase) {
            throw new Error(`Test case with id "${id}" not found`);
        }

        return testCase;
    }

    /**
     * Remove a test case by its id
     * @param id Test case id
     */
    public removeTestCaseById(id: string): void {
        const index = this._testCases.findIndex((testCase) => testCase.id === id);
        if (index === -1) {
            throw new Error(`Test case with id "${id}" not found`);
        }

        this._testCases.splice(index, 1);
    }

    /**
     * Make a copy of a test case instance.
     * The copy will have a new id and a name with the suffix " - copy"
     * @param id Test case id
     */
    public cloneTestCaseById(id: string): TestCase {
        const testCase = this.getTestCaseById(id);
        const clonedTestCase = TestCase.fromObject(testCase.toObject());
        clonedTestCase.setRandomId();
        clonedTestCase.name += ' - copy';

        this._testCases.push(clonedTestCase);

        return clonedTestCase;
    }
}
