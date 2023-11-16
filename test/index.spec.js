import request from 'supertest'
import app from '../src/app.js'
 
describe("GET /taks", () => {
})

describe("POST /tasks", () => {
    describe("dado un título y una descripción", () => {

        const newTask = {
            title: "test task",
            description: "test description",
        }

        //Realiza una solicitud POST a "/tasks" con un objeto newTask y verifica que 
        //la respuesta tenga un código de estado 200.
        test("Deberia responder con un codigo de estado 200", async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.statusCode).toBe(200)
        });


        //Verifica que el encabezado de la respuesta contenga "content-type" con el valor "application/json".
        test("Deberia contenen-type: application/json in header", async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        });


        //Verifica que la respuesta tenga una propiedad "id" definida.
        test("Deberia responder con un tasks id", async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.body.id).toBeDefined()
        });
    });


    //Este bloque contiene pruebas para el caso en que falta el título y/o la descripción en la solicitud.
    describe("Cuando el titulo y la descripcion falta", () => {
        test("deberia responder con un codigo de estado 400", async () => {
            const fields = [
                {},
                { title: "test taks" },
                { description: "test Description" }
            ];


            //Utiliza un bucle for para probar diferentes combinaciones de campos faltantes 
            //(ningún campo, solo título, solo descripción) y verifica que la respuesta 
            //tenga un código de estado 400 en cada caso.
            for (const body of fields) {
                const response = await request(app).post("/tasks").send({body});
                expect(response.statusCode).toBe(400);
            };
        });
    });
});