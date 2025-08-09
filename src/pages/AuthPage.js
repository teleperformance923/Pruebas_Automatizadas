import { By, until } from 'selenium-webdriver';
import { BASE_URL } from '../config.js';

// Selectores robustos por ID (la app usa ids estables)
const $ = {
  email: By.id('email'),
  password: By.id('password'),
  firstName: By.id('firstName'),
  lastName: By.id('lastName'),
  submitBtn: By.xpath("//button[normalize-space()='Submit']"),
  contactListH1: By.xpath("//h1[contains(., 'Contact List')]"),
};

// Algunas deploys cambian la portada. Navegamos directo a rutas claras:
const LOGIN_URL = `${BASE_URL}/login`;
const SIGNUP_URL = `${BASE_URL}/addUser`;

export class AuthPage {
  constructor(driver){ this.driver = driver; }

  async openLogin(){
    await this.driver.get(LOGIN_URL);
    await this.driver.wait(until.elementLocated($.email), 15000);
  }

  async openSignup(){
    await this.driver.get(SIGNUP_URL);
    await this.driver.wait(until.elementLocated($.firstName), 15000);
  }

  async login(email, pass){
    await this.openLogin();
    const emailInput = await this.driver.findElement($.email);
    const passInput  = await this.driver.findElement($.password);
    await emailInput.clear(); await emailInput.sendKeys(email);
    await passInput.clear();  await passInput.sendKeys(pass);
    const submit = await this.driver.findElement($.submitBtn);
    await submit.click();
    await this.driver.wait(until.elementLocated($.contactListH1), 15000);
  }

  async signup(email, pass){
    await this.openSignup();
    const fName = await this.driver.findElement($.firstName);
    const lName = await this.driver.findElement($.lastName);
    const emailInput = await this.driver.findElement($.email);
    const passInput  = await this.driver.findElement($.password);
    await fName.sendKeys('Test');
    await lName.sendKeys('User');
    await emailInput.sendKeys(email);
    await passInput.sendKeys(pass);
    const submit = await this.driver.findElement($.submitBtn);
    await submit.click();
    await this.driver.wait(until.elementLocated($.contactListH1), 15000);
  }
}
