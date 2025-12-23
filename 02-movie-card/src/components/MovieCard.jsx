import React from "react";
import { motion } from "framer-motion";

const MovieCard = ({ title, description, image, rating }) => {
    const ratingColor =
        rating >= 8 ? "text-green-500" : rating >= 6 ? "text-yellow-500" : "text-red-500";

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden w-80 cursor-pointer hover:shadow-2xl"
        >
            <img src={image} alt={title} className="w-full h-96 object-cover" />

            <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-gray-600 mb-3">{description}</p>

                <div className="flex items-center">
                    <span className="text-yellow-400 text-lg mr-2">⭐</span>
                    <span className={`font - semibold ${ratingColor}`}>{rating}/10</span>
            </div>
        </div>
    </motion.div >
  );
};

export default MovieCard;
