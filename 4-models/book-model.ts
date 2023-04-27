import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class BookModel {

    public id: number;
    public name: string;
    public price: number;
    public image: UploadedFile;
    public imageName: string;

    public constructor(book: BookModel) {
        this.id = book.id;
        this.name = book.name;
        this.price = book.price;
        this.image = book.image;
        this.imageName = book.imageName;
    }

    public static validationSchema = Joi.object({
        id: Joi.number().optional().positive().integer(),
        name: Joi.string().required().min(3).max(26),
        price: Joi.number().required().min(0).max(10_000),
        image: Joi.object().optional(),
        imageName: Joi.string().optional(),
    })

    public validation(): string {
        const result = BookModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default BookModel;




