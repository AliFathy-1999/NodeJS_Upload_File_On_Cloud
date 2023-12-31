# NodeJS_Upload_File_On_Cloud

This Node.js project allows you to upload files to the cloud using Cloudinary. It is built with TypeScript, Express, Multer, Mongoose, Docker, and Bcryptjs. This README file will guide you through the setup and usage of this project.

## Table of Contents

- [NodeJS\_Upload\_File\_On\_Cloud](#nodejs_upload_file_on_cloud)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) MongoDB Atlas account.
- A [Cloudinary](https://cloudinary.com/) account and API credentials (API Key, API Secret, Cloud Name).
- [Docker](https://www.docker.com/)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone git@github.com:AliFathy-1999/NodeJS_Upload_File_On_Cloud.git

   Or You can pull Docker Repository from 

   docker pull aliahmedfathi/nodejsapp-upload-file-on-cloudinary
2. Build Docker Image

    ```bash
    docker build -t upload-file-cloud .
3. Run Docker Container

   ```bash
   docker run -p 4000:4000 upload-file-cloud

<h2>App Features:</h2>
<ol>
 <li>User can register and upload Image</li>
 <li>User can update  data.</li>
 <li>User can delete  data.</li>
</ol>
