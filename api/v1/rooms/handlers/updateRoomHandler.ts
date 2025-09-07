import { RoomService } from "../controllers/room.controller"
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { uploadMultipleFiles } from "../../../../utils/uploadFile";
import { getFilesNames } from "../utils/getFileNames";


export async function updateRoomHandler(req: Request, res: Response, next: NextFunction) {

    uploadMultipleFiles('photos')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            throw new Error(err.message)
        } else if (err) {
            // An unknown error occurred when uploading.
            throw new Error(err)
        };
        // Everything went fine, send the file name and other fields to database
        try {
            const {id} = req.params as unknown as {id:number};
            const files = req.files as any;
            const filenames = getFilesNames(files);
            const photos = filenames;


            const { _csrf, ...newData } = req.body;
            const {
                featured,
                popular,
                newlyAdded,
                recentlySold,
                recommended,
                bedrooms,
                bathrooms,
                capacity,
                roomNumber,
                price,
                HostelId,
                rating,
                amenities,
                ...rest
            } = newData;
            // Assign default values after destructuring
            const _availability = Boolean(recentlySold);
            const _featured = Boolean(featured);
            const _popular = Boolean(popular);
            const _newlyAdded = Boolean(newlyAdded);
            const _recentlySold = Boolean(recentlySold);
            const _recommended = Boolean(recommended);
            const _bedrooms = Number(bedrooms);
            const _bathrooms = Number(bathrooms);
            const _capacity = Number(capacity);
            const _roomNumber = Number(roomNumber);
            const _price = Number(price);
            const _HostelId = Number(HostelId);
            const _rating = Number(rating);
            const _amenities = amenities.replace(/^\[|\]$/g, '').split().map((item: any) => item.replace(/'/g, ''));

            // Optionally, update newData with these defaults if needed
            newData.availability = _availability;
            newData.featured = _featured;
            newData.popular = _popular;
            newData.newlyAdded = _newlyAdded;
            newData.recentlySold = _recentlySold;
            newData.recommended = _recommended;
            newData.bedrooms = _bedrooms;
            newData.bathrooms = _bathrooms;
            newData.capacity = _capacity;
            newData.roomNumber = _roomNumber;
            newData.price = _price;
            newData.HostelId = _HostelId;
            newData.rating = _rating;
            newData.amenities = _amenities;

            const roomService = new RoomService({ ...newData, photos, id });
            const [affectedCount] = await roomService.editRoom() as [affectedCount: number];
            if (affectedCount === 1) {
                res.status(200).json({ status: "success", data: { affectedCount }, message: "Room updated" })
            } else {
                res.status(200).json({ status: "success", data: null, message: "No room updated" })
            }
        } catch (error) {
            res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
        }
    });


}