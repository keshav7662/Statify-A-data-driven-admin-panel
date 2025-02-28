import { v2 as cloudinary } from 'cloudinary';

const uploadImage = async function (imageFile) {
    try {
        // Configuration
        ("cloudinary", imageFile)
        cloudinary.config({
            cloud_name: 'dphjhbdkd',
            api_key: '471429675831442',
            api_secret: 'mY-nYTC0arIa5FNq60vGvsRXcHY'
        });

        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(imageFile, {
            public_id: 'ProfilePic',
        });

        // Return the image URL
        return uploadResult.secure_url;

    } catch (error) {
        console.error("Image upload failed:", error);
        return null; // Handle error by returning null or an appropriate message
    }
};

export default uploadImage;
