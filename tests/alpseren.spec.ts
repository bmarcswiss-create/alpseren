import { test, expect } from '@playwright/test'

test.describe('Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('affiche le logotype ALPSEREN', async ({ page }) => {
    await expect(page.locator('.header-logo-text')).toBeVisible()
    await expect(page.locator('.header-logo-text')).toHaveText('ALPSEREN')
  })

  test('switcher FR · EN présent', async ({ page }) => {
    const fr = page.getByRole('button', { name: 'FR' })
    const en = page.getByRole('button', { name: 'EN' })
    await expect(fr).toBeVisible()
    await expect(en).toBeVisible()
  })

  test('FR actif par défaut', async ({ page }) => {
    const fr = page.getByRole('button', { name: 'FR' })
    // La couleur FR active est --cream (#e8e1d2), inactive est --cream-38
    await expect(fr).toHaveCSS('color', 'rgb(232, 225, 210)')
  })

  test('bascule EN change la langue', async ({ page }) => {
    await page.getByRole('button', { name: 'EN' }).click()
    const en = page.getByRole('button', { name: 'EN' })
    await expect(en).toHaveCSS('color', 'rgb(232, 225, 210)')
  })
})

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('charge sans erreur console critique', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    // Filtrer les erreurs bénignes (ex: Resend non configuré en dev)
    const critiques = errors.filter(e => !e.includes('net::ERR') && !e.includes('favicon'))
    expect(critiques).toHaveLength(0)
  })

  test('fond --night appliqué sur body', async ({ page }) => {
    const bg = await page.evaluate(() =>
      getComputedStyle(document.body).backgroundColor
    )
    // #14110e = rgb(20, 17, 14)
    expect(bg).toBe('rgb(20, 17, 14)')
  })

  test('driver scroll de 600vh présent', async ({ page }) => {
    const height = await page.evaluate(() => {
      const el = document.getElementById('scroll-container')
      return el ? el.style.height : null
    })
    expect(height).toBe('600vh')
  })
})

test.describe('Formulaire de contact', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Scroll jusqu'à la section contact
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)
  })

  test('champs requis présents (name, email, message)', async ({ page }) => {
    await expect(page.locator('input[type="text"]').first()).toBeVisible()
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('textarea')).toBeVisible()
  })

  test('soumission sans champs bloque le formulaire', async ({ page }) => {
    const submit = page.locator('button[type="submit"]')
    await expect(submit).toBeVisible()
    await submit.click()
    // Le formulaire HTML5 doit bloquer (champs required non remplis)
    await expect(page.locator('input[type="text"]').first()).toBeFocused()
  })

  test('select service contient les deux options', async ({ page }) => {
    const select = page.locator('select')
    await expect(select).toBeVisible()
    await expect(select.locator('option[value="Lifestyle Services"]')).toHaveCount(1)
    await expect(select.locator('option[value="Estate Management"]')).toHaveCount(1)
  })
})

test.describe('Mobile (iPhone 14)', () => {
  test('header visible sur mobile', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.header-logo-text')).toBeVisible()
    await expect(page.getByRole('button', { name: 'FR' })).toBeVisible()
  })

  test('pas de défilement horizontal', async ({ page }) => {
    await page.goto('/')
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
    expect(overflow).toBe(false)
  })
})
