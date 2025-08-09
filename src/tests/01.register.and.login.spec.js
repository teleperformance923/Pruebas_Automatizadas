import { expect } from 'chai';
import { buildDriver } from '../utils/driver.js';
import { withScreenshotAlways } from '../utils/hooks.js';
import { AuthPage } from '../pages/AuthPage.js';
import { BASE_URL, TEST_EMAIL, TEST_PASSWORD } from '../config.js';

describe('Thinking Tester - Registro y Login', function(){
  let driver, auth;
  before(async ()=>{ driver = await buildDriver(); auth = new AuthPage(driver); });
  withScreenshotAlways(()=>driver);
  after(async ()=>{ await driver.quit(); });

  it('registra un usuario nuevo y redirige a la lista', async function(){
    await auth.signup(TEST_EMAIL, TEST_PASSWORD);
    const url = await driver.getCurrentUrl();
    expect(url).to.include('contactList');
  });
it('puede cerrar y volver a iniciar sesión con el usuario creado', async function(){
  // No fuerces BASE_URL aquí; simplemente llama login:
  await auth.login(TEST_EMAIL, TEST_PASSWORD);

  // Valida por contenido (H1) en vez de URL
  const h1 = await driver.findElement(By.xpath("//h1[contains(., 'Contact List')]")).getText();
  expect(h1.toLowerCase()).to.include('contact list');
});

});
