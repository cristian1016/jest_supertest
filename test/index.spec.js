import request from 'supertest'
import app from '../src/app.js'

    // Jest 

    // Supertest 
describe("GET /taks", () => {
})

describe("POST /tasks", () => {
    describe("dado un título y una descripción", () => {

        const newTask = {
            title: "test task",
            description: "test description",
        }

        test("Deberia responder con un codigo de estado 200", async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.statusCode).toBe(200)
        });


        test("Deberia contener-type: application/json in header", async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        });


        test("Deberia responder con un tasks id", async () => {
            const response = await request(app).post("/tasks").send(newTask);
            expect(response.body.id).toBeDefined()
        });
    });

    describe("Cuando el titulo y la descripcion falta", () => {
        test("deberia responder con un codigo de estado 400", async () => {
            const fields = [
                {},
                { title: "test taks" },
                { description: "test Description" }
            ];


            for (const body of fields) {
                const response = await request(app).post("/tasks").send({body});
                expect(response.statusCode).toBe(400);
            };
        });
    });
});