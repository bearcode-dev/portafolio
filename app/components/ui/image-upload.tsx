"use client";

import React from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  disabled = false,
  className = '',
}) => {
  const handleUploadSuccess = (result: any) => {
    onChange(result.info.secure_url);
    toast.success('Image uploaded successfully', {
      description: 'Your image has been uploaded to the cloud',
    });
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className={className}>
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Preview"
            className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
          />
          {!disabled && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default'}
          onSuccess={handleUploadSuccess}
          options={{
            maxFiles: 1,
            resourceType: 'image',
            clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            maxFileSize: 10000000, // 10MB
            sources: ['local', 'url', 'camera'],
            multiple: false,
            styles: {
              palette: {
                window: '#ffffff',
                sourceBg: '#f4f4f5',
                windowBorder: '#90a4ae',
                tabIcon: '#10b981',
                inactiveTabIcon: '#555a5f',
                menuIcons: '#555a5f',
                link: '#10b981',
                action: '#339933',
                inProgress: '#10b981',
                complete: '#339933',
                error: '#cc0000',
                textDark: '#000000',
                textLight: '#fcfffd'
              }
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              disabled={disabled}
              className={`
                w-full border-2 border-dashed rounded-lg p-8 text-center transition-all
                ${disabled
                  ? 'opacity-50 cursor-not-allowed border-gray-300 dark:border-gray-600'
                  : 'cursor-pointer border-gray-300 dark:border-gray-600 hover:border-brand-green dark:hover:border-brand-green'
                }
              `}
            >
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    Click to upload image
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, GIF or WebP (max 10MB)
                  </p>
                </div>
              </div>
            </button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
};

export default ImageUpload;
