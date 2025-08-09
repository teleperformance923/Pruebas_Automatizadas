import { By, until } from 'selenium-webdriver';
import { BASE_URL } from '../config.js';

const $ = {
  listH1: By.xpath("//h1[contains(., 'Contact List')]"),
  addBtn: By.xpath("//button[contains(., 'Add a New Contact') or contains(., 'Add Contact')]"),
  // Form IDs típicos en esta app:
  firstName: By.id('firstName'),
  lastName: By.id('lastName'),
  email: By.id('email'),
  phone: By.id('phone'),
  submitBtn: By.xpath("//button[normalize-space()='Submit' or normalize-space()='Save']"),
  detailsH1: By.xpath("//h1[contains(., 'Contact Details')]"),
};

const LIST_URL = `${BASE_URL}/contactList`;
const ADD_URL  = `${BASE_URL}/addContact`;

export class ContactsPage {
  constructor(driver){ this.driver = driver; }

async waitLoaded() {
  await this.driver.wait(
    until.elementLocated(By.xpath("//button[contains(., 'Add a New Contact')]")),
    15000,
    'El botón "Add a New Contact" no apareció en la lista de contactos'
  );
}


  async clickAddNew(){
    // Click real al botón, sin navegar por rutas
    const btn = await this.driver.findElement(
      By.xpath("//button[contains(., 'Add a New Contact') or contains(., 'Add Contact')]")
    );
    await btn.click();
    await this.driver.wait(until.elementLocated(By.id('firstName')), 15000);
  }

  async createContact({first='Ada', last='Lovelace', email='ada@example.com', phone='8095550000'}){
    await this.clickAddNew();
    const fn = await this.driver.findElement($.firstName);
    const ln = await this.driver.findElement($.lastName);
    const em = await this.driver.findElement($.email);
    const ph = await this.driver.findElement($.phone);
    await fn.clear(); await fn.sendKeys(first);
    await ln.clear(); await ln.sendKeys(last);
    await em.clear(); await em.sendKeys(email);
    await ph.clear(); await ph.sendKeys(phone);
    const submit = await this.driver.findElement($.submitBtn);
    await submit.click();
    await this.driver.wait(until.elementLocated($.listH1), 15000);
    // Verifica que aparezca en la tabla
    await this.driver.wait(
      until.elementLocated(By.xpath(`//table//td[contains(., "${first}") and contains(., "${last}")]`)),
      15000
    );
  }

  async openContact(first, last){
    const row = await this.driver.findElement(By.xpath(`//table//tr[td[contains(., "${first}")] and td[contains(., "${last}")]]`));
    await row.click();
    await this.driver.wait(until.elementLocated($.detailsH1), 15000);
  }

  async updateContact({first=null, last=null, email=null, phone=null} = {}){
    const fn = await this.driver.findElement($.firstName);
    const ln = await this.driver.findElement($.lastName);
    const em = await this.driver.findElement($.email);
    const ph = await this.driver.findElement($.phone);
    if (first !== null){ await fn.clear(); await fn.sendKeys(first); }
    if (last  !== null){ await ln.clear(); await ln.sendKeys(last); }
    if (email !== null){ await em.clear(); await em.sendKeys(email); }
    if (phone !== null){ await ph.clear(); await ph.sendKeys(phone); }
    const submit = await this.driver.findElement($.submitBtn);
    await submit.click();
    await this.driver.wait(until.elementLocated($.listH1), 15000);
  }

  async deleteContact(){
    // En detalles suele haber botón Delete
    const del = await this.driver.findElement(By.xpath("//button[contains(., 'Delete') or contains(., 'Remove')]"));
    await del.click();
    try {
      const alert = await this.driver.switchTo().alert();
      await alert.accept();
    } catch {}
    await this.driver.wait(until.elementLocated($.listH1), 15000);
  }
}
