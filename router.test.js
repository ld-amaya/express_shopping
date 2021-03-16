process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
let DATA = require('./fakeDB');

let item = {
    name: "chippy",
    price: "0.66"
}

beforeEach(() => {
    DATA.push(item);
})

afterEach(() => {
    DATA.length = 0;
})

// //Test 404
// describe("Return page not found 404", () => {
//     test("Return 404", async () => {
//         const res = await request(app).get(`/page404`);
//         expect(res.statusCode).toBe(404);
//     })
// })

// Test get request all items 
describe("Get Request return all list", () => {
    test("Get list of data", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({"items":[{"name":"chippy","price":"0.66"}]})
    })
    test("Get list of specific data", async () => {
        const res = await request(app).get("/items/chippy");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({"name":"chippy","price":"0.66"})
    })
    test("Return not found if not on the list", async () => {
        const res = await request(app).get("/items/piatos");
        expect(res.statusCode).toBe(404);
    })
})

// Test Post request
describe("Add new items", () => {
    test("Add new item to list", async () => {
        const res = await request(app).post("/items").send({ name: "piatos", price: "0.75" });
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({added:{ "name": "piatos", "price": "0.75" }})
    })
})

//Test Delete Request
describe("Delete request", () => {
    test("Delete data on the list", async () => {
        const res = await request(app).delete("/items/chippy");
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({message: 'deleted'})
    })
    test("Return not found if not on the list", async () => {
        const res = await request(app).delete("/items/pringles");
        expect(res.statusCode).toBe(404);
    })
})

// Test Patch Request
describe("Patch request", () => {
    test("Update data", async () => {
        const res = await request(app).patch("/items/chippy").send({ name: "piatos", price: "0.75" });
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({updated:{ "name": "piatos", "price": "0.75" }})
    })
    test("Return not found if not on the list", async () => {
        const res = await request(app).get("/items/pringles");
        expect(res.statusCode).toBe(404);
    })
})