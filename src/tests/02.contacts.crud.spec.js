import { expect } from 'chai';
import { buildDriver } from '../utils/driver.js';
import { withScreenshotAlways } from '../utils/hooks.js';
import { AuthPage } from '../pages/AuthPage.js';
import { ContactsPage } from '../pages/ContactsPage.js';
import { TEST_EMAIL, TEST_PASSWORD } from '../config.js';

describe('Thinking Tester - CRUD de contactos', function(){
  let driver, auth, contacts;
before(async ()=>{
  driver = await buildDriver();
  auth = new AuthPage(driver);
  contacts = new ContactsPage(driver);

  // 1) Inicia sesión con usuario YA existente
  await auth.login(TEST_EMAIL, TEST_PASSWORD);

  // 2) Espera inequívocamente la pantalla de lista
  await contacts.waitLoaded();
});


  withScreenshotAlways(()=>driver);
  after(async ()=>{ await driver.quit(); });

  it('crea, edita y elimina un contacto', async function(){
    await contacts.waitLoaded();
    await contacts.createContact({ first:'Ada', last:'Lovelace', email:'ada@example.com', phone:'8095550000' });
    await contacts.openContact('Ada', 'Lovelace');
    await contacts.updateContact({ phone:'8095551111' });
    await contacts.deleteContact();
    let removed = false;
    try { await contacts.openContact('Ada', 'Lovelace'); } catch { removed = true; }
    expect(removed).to.equal(true);
  });
});
