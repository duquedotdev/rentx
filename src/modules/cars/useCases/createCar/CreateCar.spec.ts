import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "string",
            description: "string",
            daily_rate: 10,
            license_plate: "string",
            fine_amount: 100,
            brand: "string",
            category_id: "string",
        });

        expect(car).toHaveProperty("id");
    });

    it("shouldn't be able to create a new car with a same license plate", async () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Car1",
                description: "string",
                daily_rate: 10,
                license_plate: "ABC-123",
                fine_amount: 100,
                brand: "string",
                category_id: "string",
            });
            await createCarUseCase.execute({
                name: "Car1",
                description: "string",
                daily_rate: 10,
                license_plate: "ABC-123",
                fine_amount: 100,
                brand: "string",
                category_id: "string",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to create a car with availability by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Available",
            description: "string",
            daily_rate: 10,
            license_plate: "ABC-123",
            fine_amount: 100,
            brand: "string",
            category_id: "string",
        });

        expect(car.available).toBe(true);
    });
});
