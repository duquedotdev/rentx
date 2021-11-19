import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/inMemory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        );
    });
    it("should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: " Category description test",
        };
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });
        const createdCategory = await categoriesRepositoryInMemory.findByName(
            category.name
        );
        expect(createdCategory).toHaveProperty("id");
    });

    it("should not be able to create a duplicated category", async () => {
        expect(async () => {
            const category = {
                name: "Category Test",
                description: " Category description test",
            };

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
