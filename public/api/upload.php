<?php
$target_dir = "../avatars/";
$avatarFile = $_FILES["avatarFile"];
$target_file = $target_dir . basename($avatarFile["name"]);
$uploadOk = 1;
 header("Access-Control-Allow-Origin: *");
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($avatarFile["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        var_dump(http_response_code(406));
        echo "File is not an image.";
        $uploadOk = 0;
    }
}

// Check file size
if ($avatarFile["size"] > 500000) {
    var_dump(http_response_code(413));
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
// if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
// && $imageFileType != "gif" ) {
//         var_dump(http_response_code(406));
//     echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
//     $uploadOk = 0;
// }
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($avatarFile["tmp_name"], $target_file)) {
        echo basename( $avatarFile["name"]);
    } else {
        var_dump(http_response_code(406));
        echo "Unknown error occured";
    }
}
?>