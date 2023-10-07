const app = require("../app");
const session = require("supertest");
const agent = session(app);

const character1 = {
  id: 5,
  name: "Jerry Smith",
  status: "Alive",
  species: "Human",
  gender: "Male",
  origin: {
    name: "Earth (Replacement Dimension)",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
};

const character2 = {
  id: 2,
  name: "Morty Smith",
  status: "Alive",
  species: "Human",
  gender: "Male",
  origin: {
    name: "unknown",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
};

describe("Test de RUTAS", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status:200", async () => {
      await agent.get("/rickandmorty/character/1").expect(200);
    });

    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
      const { body } = await agent.get("/rickandmorty/character/1");
      expect(body).toHaveProperty("id");
      expect(body).toHaveProperty("name");
      expect(body).toHaveProperty("species");
      expect(body).toHaveProperty("gender");
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("origin");
      expect(body).toHaveProperty("image");
    });

    it("Si hay un error responde con status: 404", async () => {
      await agent.get("/rickandmorty/character/3210").expect(404);
    });
  });
  describe("GET /rickandmorty/login", () => {
    it("Devuelve un objeto con la propiedad access en true si la informacion es valida", async () => {
      const { body } = await agent.get(
        "/rickandmorty/login?email=m&password=m"
      );
      expect(body.access).toEqual(true);
    });

    it("Devuelve un objeto con la propiedad access en false si la informacion es falsa", async () => {
      const { body } = await agent.get(
        "/rickandmorty/login?email=pepe&password=00000"
      );
      expect(body.access).toEqual(false);
    });
  });
  describe("POST /rickandmorty/fav", () => {
    it("Devuelve un arreglo de lo enviado por body", async () => {
      const response = (await agent.post("/rickandmorty/fav").send(character1))
        .body;
      expect(response).toContainEqual(character1);
    });

    it("Debe agregar personajes a favoritos sin eliminar los existentes", async () => {
      const response = (await agent.post("/rickandmorty/fav").send(character2))
        .body;
      expect(response).toContainEqual(character1);
      expect(response).toContainEqual(character2);
    });
  });
  describe("DELETE /rickandmorty/fav/:id", () => {
    it("Si el ID no existe, deberia retornar el arreglo con todos los favoritos", async () => {
      const response = (await agent.delete("/rickandmorty/fav/3210")).body;
      expect(response).toContainEqual(character1);
      expect(response).toContainEqual(character2);
    });

    it("Si el ID es valido, se elimina ese personaje", async () => {
      const response = (await agent.delete("/rickandmorty/fav/2")).body;
      expect(response).not.toBe(character2);
    });
  });
});
