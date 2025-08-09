# Selenium + Mocha para Thinking Tester Contact List

Sitio: https://thinking-tester-contact-list.herokuapp.com/

## Pasos
1) `cp .env.example .env` (o crea `.env`) y edita si quieres (por defecto usa email aleatorio)
2) `npm install`
3) `npm test` → genera `reports/index.html` y lo abre automáticamente
4) Capturas en `screenshots/` (siempre, pase o falle)

## Variables (.env)
BASE_URL=https://thinking-tester-contact-list.herokuapp.com
TEST_EMAIL=random        # usa email aleatorio en cada ejecución; o define uno fijo
TEST_PASSWORD=Prueba123!
