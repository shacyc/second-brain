import { useState } from "react";

export default function NoteCover({ note }) {
    const [cover, setCover] = useState(note?.cover);

    const renderEmptyCover = () => <div className="h-16"></div>

    const renderCover = () => "Cover"

    return cover ? renderCover() : renderEmptyCover()

}