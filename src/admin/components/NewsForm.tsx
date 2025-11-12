import { useCallback, useState, type ChangeEvent } from "react";
import type { AddNews, News } from "../../shared/supabase";
import { insertNews, supabase, uploadImg } from "../../shared/supabase";

interface NewsFormProps {
	news?: News;
	onSuccess: () => void;
	onCancel: () => void;
}

// TODO put preview of the old thumbnail if exists or put input:file if not
export default function NewsForm({ news, onSuccess, onCancel }: NewsFormProps) {
	const [title, setTitle] = useState(news?.title || "");
	const [body, setBody] = useState(news?.body || "");
	const [imageUrl, setImageUrl] = useState(news?.thumbnail_url || "");
	const [imgFile, setImgFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [preview, setPreview] = useState("");

	const checkImgFile = useCallback((file: File) => {
		const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes

		const ALLOWED_IMAGE_TYPES = [
			"image/jpeg",
			"image/jpg",
			"image/png",
			"image/webp",
		];

		if (file) {
			// Check file type
			if (!ALLOWED_IMAGE_TYPES.includes(file.type))
				return {
					msg: "نوع الملف غير مسموح به, الانواع المسموحة JPEG, PNG, and WebP",
					success: false,
				};

			// Check file size
			if (file.size > MAX_FILE_SIZE)
				return {
					msg: "حجم الصورة يجب ان يكون اقل من 3MB",
					success: false,
				};
		}

		return {
			msg: "",
			success: true,
		};
	}, []);

	const handleChangeThumbnailImage = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;

		if (!file) {
			setImgFile(null);
			setPreview("");
			return;
		}

		const ret = checkImgFile(file);
		if (!ret.success) return setError(ret.msg);

		const reader = new FileReader();
		reader.onload = () => {
			setPreview(reader.result as string);
		};

		reader.readAsDataURL(file);

		setImgFile(file);
	};

	const checkForm = () => {
		if (!title) {
			return {
				msg: "الرجاء ادخل عنوان الخبر",
				success: false,
			};
		}

		if (!body) {
			return {
				msg: "أدخل محتوى الخبر",
				success: false,
			};
		}

		if (imgFile) {
			const ret = checkImgFile(imgFile);
			if (!ret.success) return ret;
		}

		return {
			msg: "",
			success: true,
		};
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		const ret = checkForm();

		if (!ret.success) {
			setError(ret.msg);
			setLoading(false);
			return;
		}

		try {
			if (news) {
				// Update existing news
				const { error: updateError } = await supabase
					.from("news")
					.update({
						title,
						body,
						image_url: imageUrl || null,
						updated_at: new Date().toISOString(),
					})
					.eq("id", news.id);

				if (updateError) throw updateError;
			} else {
				// Create new news

				// todo check file size correctly
				const publicImageUrl = imgFile
					? await uploadImg(imgFile, "news-thumbnails")
					: null;

				const news: AddNews = {
					title,
					body,
					thumbnail_url: publicImageUrl,
				};

				setImageUrl(publicImageUrl || "");

				await insertNews(news);
			}

			onSuccess();
		} catch (err: unknown) {
			setError((err as Error).message || "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{error && (
				<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
					{error}
				</div>
			)}

			<div>
				<label
					htmlFor="title"
					className="block text-sm font-medium text-gray-700">
					عنوان الخبر
				</label>
				<input
					type="text"
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
				/>
			</div>

			<div>
				<label
					htmlFor="content"
					className="block text-sm font-medium text-gray-700">
					محتوى الخبر
				</label>
				<textarea
					id="content"
					rows={6}
					value={body}
					onChange={(e) => setBody(e.target.value)}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
				/>
			</div>

			<div>
				<label
					htmlFor="thumbnail"
					className="block text-sm font-medium text-gray-700">
					{imageUrl ? "تغيير الصورة" : "أضف صورة للخبر"}
				</label>

				<input
					type="file"
					id="thumbnail"
					accept="image/*"
					onChange={handleChangeThumbnailImage}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
				/>
			</div>

			{preview && (
				<div className="preview">
					<img src={preview} alt="" />
				</div>
			)}

			<div className="flex justify-end space-x-3">
				<button
					type="button"
					onClick={onCancel}
					className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
					الغاء
				</button>
				<button
					type="submit"
					disabled={loading}
					className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50">
					{loading ? "جارٍ الحفظ..." : news ? "حفظ التعديلات" : "أنشاء الخبر"}
				</button>
			</div>
		</form>
	);
}
