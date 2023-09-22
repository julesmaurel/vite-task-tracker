// @ts-check
const { test, expect } = require('@playwright/test');
const data = require('../db-backup.json')

test.describe('Task tracker tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
  });

  test('Create a task', async ({ page }) => {
    const taskName = 'Task for test'
    const taskTime = '78 of September'
    await page.getByTestId('addButton').click()
    
    await page.getByTestId('taskText').fill(taskName)
    await page.getByTestId('taskTime').fill(taskTime)
    await page.getByTestId('taskReminder').click()
    await page.getByTestId('saveNewTask').click()
    await page.waitForTimeout(1000);
    
    const lastCreatedTask = await page.getByTestId('task').last();
    expect(lastCreatedTask).toHaveText(taskName + taskTime);
    expect(lastCreatedTask).toHaveClass('task reminder')
  });

  test('Reset tasks', async ({ page }) => {    
    // Click on the reset button
    await page.getByTestId('resetButton').click()
    await page.waitForTimeout(2000)
    
    const taskCount = await page.$$eval('.task', tasks => tasks.length);
    expect(taskCount).toBe(3);

    await expect(page.getByText(data.tasks[0].text)).toBeVisible();
    await expect(page.getByText(data.tasks[1].text)).toBeVisible();
    await expect(page.getByText(data.tasks[2].text)).toBeVisible();
  });

})