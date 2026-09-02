# OrangeHRM Playwright Test Automation for Raghu Branch

A comprehensive test automation framework for OrangeHRM using **Playwright** with **Page Object Model (POM)** pattern, demonstrating AI-assisted test development with **tamash-playwright** for self-healing tests.

## 🎯 Project Overview

This repository showcases modern test automation practices for web applications, specifically targeting the OrangeHRM Human Resource Management System. The project demonstrates:

- **Page Object Model (POM)** architecture for maintainable test code
- **Playwright** for cross-browser automation
- **TypeScript** for type-safe test implementation
- **AI-Assisted Testing** with tamash-playwright for intelligent test healing
- **Comprehensive Test Coverage** for employee management workflows

## 🚀 Key Features

### 1. **AI-Enhanced Test Automation with tamash-playwright**
- Automatic test healing when UI elements change
- Self-correcting test assertions
- Reduced maintenance overhead
- Intelligent locator management

### 2. **Page Object Model Architecture**
- Separation of test logic from UI interactions
- Reusable page methods across test suites
- Centralized locator management
- Easy maintenance and scaling

### 3. **Comprehensive Test Suite**
- 20+ feature-specific test scenarios
- Login flow verification
- Employee creation workflows
- Form validation testing
- Image upload handling
- Field constraint validation

## 📁 Project Structure

```
pwjune30ai/
├── src/
│   ├── pages/                    # Page Object Model classes
│   │   ├── BasePage.ts          # Base class for all pages
│   │   ├── LoginPage.ts         # Login page interactions
│   │   ├── DashboardPage.ts     # Dashboard page interactions
│   │   ├── AddEmployeePage.ts   # Employee creation page
│   │   ├── PersonalDetailsPage.ts
│   │   ├── PIMPage.ts           # PIM module interactions
│   │   └── Index.ts             # Page object exports
│   ├── fixtures/
│   │   └── baseAppTest.ts       # Playwright test fixtures
│   ├── testdata/
│   │   ├── users.json          # Test user credentials
│   │   └── employeeData.json    # Employee test data
│   └── DataUtils/
│       └── ExcelDataUtil.ts     # Excel data utilities
│
├── tests/
│   ├── LoginTest.spec.ts        # Login test suite
│   └── add-employee/            # Employee creation tests
│       ├── basic-creation.spec.ts
│       ├── cancel-button.spec.ts
│       ├── employee-id-readonly.spec.ts
│       ├── empty-form-submit.spec.ts
│       ├── login-status-options.spec.ts
│       ├── max-length-name.spec.ts
│       ├── password-max-length.spec.ts
│       ├── remove-picture.spec.ts
│       ├── save-button-success.spec.ts
│       ├── special-characters-name.spec.ts
│       ├── submit-with-enter.spec.ts
│       ├── toggle-login-enable-disable.spec.ts
│       ├── toggle-login-persistence.spec.ts
│       ├── upload-invalid-format.spec.ts
│       ├── upload-jpg-picture.spec.ts
│       ├── upload-large-picture.spec.ts
│       ├── upload-png-picture.spec.ts
│       ├── username-validation.spec.ts
│       ├── validation-duplicate-username.spec.ts
│       ├── validation-first-name.spec.ts
│       ├── validation-password-mismatch.spec.ts
│       ├── validation-username.spec.ts
│       ├── validation-weak-password.spec.ts
│       └── without-login.spec.ts
│
├── playwright-report/           # Test execution reports
├── test-results/                # Test result artifacts
├── package.json                 # Project dependencies
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json               # TypeScript configuration
├── QUICK_START.md              # Quick start guide
├── TAMASH_SETUP.md             # tamash-playwright setup
├── TAMASH_CHECKLIST.md         # Implementation checklist
└── test-plan.md                # Test plan documentation
```

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| **Playwright** | Cross-browser automation framework |
| **TypeScript** | Type-safe test code |
| **Node.js** | Runtime environment |
| **npm** | Dependency management |
| **tamash-playwright** | AI-powered self-healing tests |

## 📋 Prerequisites

- **Node.js** v16 or higher
- **npm** v7 or higher
- **Git** for version control
- OrangeHRM application access (live or local instance)

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/QtpSudhakarTrainings/pwjune30ai.git
cd pwjune30ai
```

### 2. Install Dependencies

```bash
npm install
```

This installs:
- Playwright browsers and dependencies
- TypeScript compiler
- Testing utilities and type definitions

### 3. Configure Test Environment

Update your OrangeHRM application URL in `playwright.config.ts`:

```typescript
const config: PlaywrightTestConfig = {
  webServer: {
    command: 'npm run start',
    port: 8080,
    // Adjust URL based on your OrangeHRM instance
  },
  use: {
    baseURL: 'http://localhost:8080',
  },
};
```

### 4. Prepare Test Data

Ensure test credentials are configured in `src/testdata/users.json`:

```json
{
  "admin": {
    "username": "admin",
    "password": "admin123"
  }
}
```

## 🧪 Running Tests

### Run All Tests

```bash
npm test
```

### Run Specific Test File

```bash
npx playwright test tests/LoginTest.spec.ts
```

### Run Tests in a Specific Directory

```bash
npx playwright test tests/add-employee/
```

### Run Tests with UI Mode

```bash
npx playwright test --ui
```

### Debug Tests

```bash
npx playwright test --debug
```

### View Test Report

```bash
npx playwright show-report
```

## 🤖 AI and Playwright Workflow

### Understanding tamash-playwright

**tamash-playwright** is an AI-powered test healing framework that:

1. **Detects UI Changes**: Automatically identifies when elements change
2. **Suggests Fixes**: Provides intelligent solutions for broken tests
3. **Self-Heals**: Updates locators and assertions automatically
4. **Learns Patterns**: Improves healing accuracy over time

### Integration with AI

This project demonstrates how AI assistants can:

- **Generate Test Code**: Automatically create test scenarios from specifications
- **Maintain Tests**: Update tests when applications evolve
- **Optimize Strategies**: Suggest better test patterns and approaches
- **Document Workflows**: Create and maintain test documentation

### Key Principles

#### 1. **No Locators in Tests**
```typescript
// ❌ WRONG - Locators directly in tests
test('bad test', async ({ page }) => {
  await page.locator('.button-class').click();
});

// ✅ CORRECT - Locators encapsulated in page objects
test('good test', async ({ addEmployeePage }) => {
  await addEmployeePage.clickSaveButton();
});
```

#### 2. **Action + Verification Pattern**
```typescript
// ✅ Every action must be verified
async fillAndVerifyEmployeeName(name: string): Promise<void> {
  await this.fillFirstName(name);
  await this.verifyFirstNameFilled(name); // Verification after action
}
```

#### 3. **Page Object Methods Only in Tests**
```typescript
// ✅ Tests call page methods, not locators
test('create employee', async ({ addEmployeePage }) => {
  await addEmployeePage.navigateToAddEmployee();
  await addEmployeePage.fillEmployeeDetails(testData);
  await addEmployeePage.verifyEmployeeCreated();
});
```

## 📚 Learning Resources

### Page Object Model (POM)
- Encapsulates page-specific interactions
- Improves test maintainability
- Enables code reuse
- See `src/pages/` for implementation examples

### Playwright Documentation
- [Official Playwright Docs](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

### tamash-playwright
- Self-healing test framework
- AI-assisted test maintenance
- See `TAMASH_SETUP.md` for detailed setup
- See `TAMASH_CHECKLIST.md` for implementation steps

## 🔄 CI/CD Integration

To integrate with CI/CD pipelines (GitHub Actions, Jenkins, etc.):

```bash
# Run tests in headless mode
npx playwright test --reporter=list

# Generate JSON report for integration
npx playwright test --reporter=json --reporter-output=results.json

# Exit with proper status codes
echo "Test run completed"
```

## 📊 Test Reports

After running tests, view detailed reports:

```bash
# Generate HTML report
npx playwright test --reporter=html

# View the report
npx playwright show-report
```

Reports include:
- Test execution timeline
- Failed test details
- Screenshots and videos
- Performance metrics

## 🐛 Troubleshooting

### Tests Failing Due to UI Changes
1. Run tamash-playwright healing workflow
2. Review suggested changes
3. Apply and verify fixes
4. Commit updated tests

### Slow Test Execution
- Check network conditions
- Verify OrangeHRM instance availability
- Review test parallelization settings in `playwright.config.ts`

### Element Not Found
- Verify page object methods are being called (not direct locators)
- Check test data availability
- Review browser console for JavaScript errors

## 🤝 Contributing

### Adding New Tests

1. **Create page methods** in appropriate page class
2. **Write test scenario** using page object methods only
3. **Include verification steps** after each action
4. **Add test data** to `src/testdata/`
5. **Run and validate** locally before pushing

### Fixing Broken Tests

1. Run tests and identify failures
2. Use tamash-playwright to suggest fixes
3. Review and apply healing changes
4. Verify fixes work consistently
5. Commit changes with descriptive messages

## 📝 Documentation

- **QUICK_START.md** - Get started in 5 minutes
- **TAMASH_SETUP.md** - Set up tamash-playwright framework
- **TAMASH_CHECKLIST.md** - Implementation checklist
- **test-plan.md** - Complete test plan and coverage

## 🎓 Use Cases

This repository demonstrates:

1. **Modern Test Automation** with industry best practices
2. **AI-Assisted Development** for test maintenance
3. **Page Object Model** for scalable test architecture
4. **TypeScript** for type-safe test code
5. **Self-Healing Tests** with tamash-playwright

## 📄 License

This project is open source and available under the MIT License.

## 👥 Support

For questions or issues:
- Check existing documentation
- Review test examples in `tests/` directory
- Consult Playwright documentation
- Refer to tamash-playwright setup guides

## 🚀 Next Steps

1. **Clone the repository**
2. **Install dependencies** with `npm install`
3. **Follow QUICK_START.md** for immediate execution
4. **Explore test examples** to understand the pattern
5. **Set up tamash-playwright** using TAMASH_SETUP.md
6. **Add your own tests** following the established patterns

---

**Happy Testing! 🎉**

For the latest updates, visit: [GitHub Repository](https://github.com/QtpSudhakarTrainings/pwjune30ai)
