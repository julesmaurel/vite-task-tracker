// @ts-check
const { test, expect } = require('@playwright/test');
const data = require('../db-backup.json')

test.describe('Task tracker tests', () => {

  test.beforeEach(async ({ page }) => {
    // reset the board before each tests
    await page.goto('/');
    await page.getByTestId('resetButton').click().then(() =>{
      page.waitForTimeout(2000)
    })
  });

  test('Create a task', async ({ page }) => {
    const taskName = 'Task for test'
    const taskTime = '78 of September'
    await page.getByTestId('addButton').click()
    
    await page.getByTestId('taskText').fill(taskName)
    await page.getByTestId('taskTime').fill(taskTime)
    await page.getByTestId('taskReminder').click()
    await page.getByTestId('saveNewTask').click()
    await page.waitForTimeout(1000)
    
    const lastCreatedTask = await page.getByText(taskName + taskTime).first()
    await expect(lastCreatedTask).toBeVisible()
    await expect(lastCreatedTask).toHaveClass('task reminder')
  });

  test('Toggle reminder on and off', async({page}) => {
    await page.getByTestId('task').first().dblclick()
    const taskToModify = page.getByTestId('task').first()
    await expect(taskToModify).toHaveClass('task reminder')
  })

  test('Delete an individual task', async({page}) => {
    await page.getByTestId('task').first().hover().then(() => {
      page.getByTestId('deleteIcon').click()
    })
    await page.waitForTimeout(1000)
    const count = await page.getByTestId('task').count();
    await expect(count).toBe(2);
  })

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