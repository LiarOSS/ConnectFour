import React from "react";

interface FileListProps {
    files: FileListItem[]
}

interface FileListItem {
    name: string,
    size: number,
    lastModified: string,
    sharedWith: string[]
}

const FileList = ({files, ...props}: FileListProps) => (
    <table className="w-full">
        <tr>
            <th>FILE</th>
            <th>SIZE</th>
            <th>LAST MODIFIED</th>
            <th>SHARED WITH</th>
        </tr>
        {
            files.map((file) => (
                <tr>
                    <td>{file.name}</td>
                    <td>{file.size}</td>
                    <td>{file.lastModified}</td>
                    <td>{file.sharedWith}</td>
                </tr>
            ))
        }
    </table>
)

export default FileList;