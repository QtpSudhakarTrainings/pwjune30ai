module.exports = {
  default: {
    paths: ['bdd/features/loginadmin.feature'],
    requireModule: ['tsx/cjs'],
    require: ['bdd/steps/**/*.steps.ts'],
    format: [
      'progress-bar',
      'html:cucumber-report.html',
      'json:cucumber-report.json',
    ],
    timeout: 120000,
  },
};
