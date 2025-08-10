#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('🧪 Running SDG Matching Tests...\n');

try {
  // Run Jest tests
  execSync('npx jest src/matchProject.test.ts --verbose', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('\n✅ All tests passed!');
} catch (error) {
  console.error('\n❌ Some tests failed!');
  process.exit(1);
} 