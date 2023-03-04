import TestSuite from '../models/testing/TestSuite';

/**
 * Test suites collection manager
 */
export default class TestSuitesController {
    private readonly _testSuites: TestSuite[] = [];

    /**
     * Use {@link TestSuitesController.initTestSuites} to initialize test suites collection and get an instance
     */
    private constructor() {}

    /**
     * Initialize test suites collection from objects array
     * @param testSuitesObjects Objects array to initialize test suites collection
     * @returns Test suites collection manager instance
     */
    public static initTestSuites(testSuitesObjects: any[] = []): TestSuitesController {
        const instance = new TestSuitesController();
        instance._testSuites.push(...testSuitesObjects.map(t => TestSuite.fromObject(t)));

        return instance;
    }

    /**
     * Create a new test suite with optional name and description
     * @param name Name of the test suite
     * @param description Description of the test suite
     * @returns Test suite instance
     */
    public createTestSuite(name?: string, description?: string): TestSuite {
        const testSuite = new TestSuite(name ?? 'Test Suite', description ?? '');
        this._testSuites.push(testSuite);

        return testSuite;
    }

    /**
     * Get test suites instance by their ids
     * @param ids Test suite ids
     * @returns Test suite instances
     */
    public getTestSuiteByIds(...ids: string[]): TestSuite[] {
        return this._testSuites.filter((testSuite) => ids.includes(testSuite.id));
    }

    /**
     * Get test suite instance by its id
     * @param id Test suite id
     * @returns Test suite instance
     */
    public getTestSuiteById(id: string): TestSuite {
        const testSuite = this._testSuites.find((testSuite) => testSuite.id === id);
        if (!testSuite) {
            throw new Error(`Test suite with id "${id}" not found`);
        }

        return testSuite;
    }

    /**
     * Remove a test suite by its id
     * @param id Test suite id
     */
    public removeTestSuiteById(id: string): void {
        const index = this._testSuites.findIndex((testSuite) => testSuite.id === id);
        if (index === -1) {
            throw new Error(`Test suite with id "${id}" not found`);
        }

        this._testSuites.splice(index, 1);
    }

    /**
     * Make a copy of a test suite instance.
     * The copy will have a new id and a name with the suffix " - copy"
     * @param id Test suite id
     */
    public cloneTestSuiteById(id: string): TestSuite {
        const testSuite = this.getTestSuiteById(id);
        const clonedTestSuite = testSuite.clone();
        clonedTestSuite.name += ' - copy';

        this._testSuites.push(clonedTestSuite);

        return clonedTestSuite;
    }
}
