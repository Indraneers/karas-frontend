"use client";

import React, { type SyntheticEvent } from "react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop
} from "react-image-crop";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";

import "react-image-crop/dist/ReactCrop.css";
import { CropIcon, Trash2Icon, ImageIcon } from "lucide-react";

interface ImageCropperFormFieldProps {
  form: any; // Your form instance
  name: string; // Field name (e.g., "file")
  label?: string; // Form label
  className?: string;
}

export function ImageCropperFormField({
  form,
  name,
  label = "Upload Image",
  className = ""
}: ImageCropperFormFieldProps) {
  const aspect = 1;

  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [crop, setCrop] = React.useState<Crop>();
  const [croppedImageUrl, setCroppedImageUrl] = React.useState<string>("");
  const [originalImageUrl, setOriginalImageUrl] = React.useState<string>("");
  const [previewUrl, setPreviewUrl] = React.useState<string>("");

  function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function onCropComplete(crop: PixelCrop) {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imgRef.current, crop);
      setCroppedImageUrl(croppedImageUrl);
    }
  }

  function getCroppedImg(image: HTMLImageElement, crop: PixelCrop): string {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );
    }

    return canvas.toDataURL("image/png", 1.0);
  }

  // Convert data URL to File object
  function dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  async function onCrop(onChange: (file: File) => void) {
    try {
      if (croppedImageUrl) {
        const croppedFile = dataURLtoFile(croppedImageUrl, 'cropped-image.png');
        onChange(croppedFile);
        setPreviewUrl(croppedImageUrl);
        setDialogOpen(false);
      }
    }
    catch (error) {
      alert("Something went wrong!");
    }
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>, onChange: (file: File) => void) {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setOriginalImageUrl(url);
      setPreviewUrl(url);
      onChange(file);
    }
  }

  function handleImageClick(currentFile: File | null) {
    if (currentFile) {
      setDialogOpen(true);
    }
    else {
      fileInputRef.current?.click();
    }
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem className={`mt-6 ${ className }`}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <>
              <input
                {...fieldProps}
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(e, onChange)}
                className="hidden"
              />
              
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <div
                    onClick={() => handleImageClick(value)}
                    className="relative bg-slate-50 hover:bg-slate-100 border-2 border-slate-300 hover:border-slate-400 border-dashed rounded-xl w-[300px] h-[300px] transition-colors cursor-pointer"
                  >
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="rounded-xl w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col justify-center items-center h-full text-slate-500">
                        <ImageIcon className="mb-2 w-8 h-8" />
                        <span className="font-medium text-sm">Click to upload POS icon</span>
                        <span className="text-slate-400 text-xs">PNG, JPG up to 10MB</span>
                      </div>
                    )}
                    
                    {previewUrl && (
                      <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-0 hover:bg-opacity-20 rounded-xl transition-all">
                        <div className="bg-white opacity-0 hover:opacity-100 shadow-lg p-2 rounded-full transition-opacity">
                          <CropIcon className="w-4 h-4 text-slate-600" />
                        </div>
                      </div>
                    )}
                  </div>
                </DialogTrigger>
                
                <DialogContent className="gap-0 p-0 max-w-2xl">
                  <div className="p-6 size-full">
                    {originalImageUrl && (
                      <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => onCropComplete(c)}
                        aspect={aspect}
                        className="w-full"
                      >
                        <img
                          ref={imgRef}
                          className="max-w-full max-h-96 object-contain"
                          alt="Image to crop"
                          src={originalImageUrl}
                          onLoad={onImageLoad}
                        />
                      </ReactCrop>
                    )}
                  </div>
                  <DialogFooter className="justify-center p-6 pt-0">
                    <DialogClose asChild>
                      <Button
                        size={"sm"}
                        type="reset"
                        className="w-fit"
                        variant={"outline"}
                        onClick={() => {
                          onChange(null);
                          setPreviewUrl("");
                          setOriginalImageUrl("");
                          setCroppedImageUrl("");
                        }}
                      >
                        <Trash2Icon className="mr-1.5 size-4" />
                        Remove
                      </Button>
                    </DialogClose>
                    <Button 
                      type="button" 
                      size={"sm"} 
                      className="w-fit" 
                      onClick={() => onCrop(onChange)}
                    >
                      <CropIcon className="mr-1.5 size-4" />
                      Crop & Save
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

// Helper function to center the crop
export function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
): Crop {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 50,
        height: 50
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}