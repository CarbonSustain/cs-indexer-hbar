# SDG Matching Tests

This directory contains comprehensive unit tests for the SDG (Sustainable Development Goals) matching functionality.

## Test Coverage

### 1. Individual SDG Tests
- Tests for each SDG format (SDG 1, SDG 2, SDG 13, etc.)
- Tests for various text formats:
  - `"SDG Type/Name: X - Title"`
  - `"SDG X: Title"`
  - `"Goal X: Title"`
  - `"Sustainable Development Goal X"`
  - `"SDG X"` (standalone)
  - `"Title (SDG X)"`
  - `"SDG X (Title)"`

### 2. All 17 SDGs Test
- Tests all 17 SDGs individually
- Tests with both number-based input (`'sdg 13'`) and title-based input (`'climate action'`)

### 3. Edge Cases and Error Handling
- Empty text handling
- Empty SDG array handling
- Null/undefined text handling
- Invalid SDG numbers
- Case insensitive input

### 4. Real-world Text Tests
- Tests with actual problematic documents
- Verifies that "Climate Action Reserve" doesn't match SDG 13
- Ensures only proper SDG references are matched

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Specific Test File
```bash
npx jest src/matchProject.test.ts
```

### Run Tests with Verbose Output
```bash
npx jest src/matchProject.test.ts --verbose
```

## Key Test Assertions

### SDG 13 Specific Tests
```typescript
// Should find SDG 13 in proper format
expect(getSDGMatchCount("SDG Type/Name: 13 - Climate Action", ['sdg 13'])).toBe(1);

// Should NOT find SDG 13 in "Climate Action Reserve"
expect(getSDGMatchCount("Climate Action Reserve (CAR)", ['sdg 13'])).toBe(0);
```

### All 17 SDGs Test
```typescript
// Tests all SDGs from 1 to 17
const allSDGs = ['sdg 1', 'sdg 2', ..., 'sdg 17'];
allSDGs.forEach((sdg, index) => {
  const result = getSDGMatchCount(`SDG Type/Name: ${index + 1} - Test Goal`, [sdg]);
  expect(result).toBe(1);
});
```

## Test Data

The tests use various text samples including:
- Proper SDG references
- Incorrect references (like "Climate Action Reserve")
- Mixed content with multiple SDGs
- Text without any SDG references
- Real-world problematic documents

## Expected Results

- ✅ SDG 13 should match: `"SDG Type/Name: 13 - Climate Action"`
- ❌ SDG 13 should NOT match: `"Climate Action Reserve (CAR)"`
- ✅ All 17 SDGs should work with their respective formats
- ✅ Case insensitive matching should work
- ✅ Multiple SDGs in same text should be counted correctly 