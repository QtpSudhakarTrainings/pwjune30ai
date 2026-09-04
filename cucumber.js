module.exports = {
  default: {
    paths: ['bdd/features/addemployee.feature'],
    requireModule: ['tsx/cjs'],
    require: ['bdd/support/**/*.ts', 'bdd/steps/**/*.steps.ts'],
    format: [
      'progress-bar',
      'html:cucumber-report.html',
      'json:cucumber-report.json',
    ],
    timeout: 120000,
  },
};
