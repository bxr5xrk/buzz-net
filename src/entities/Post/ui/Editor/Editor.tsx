'use client';

import TextareaAutoSize from 'react-textarea-autosize';
import { useForm } from 'react-hook-form';
import { PostCreationRequest, PostValidator } from '@/shared/validators/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCallback, useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import { uploadFile } from '../../model/service/uploadFile';
import { toast } from '@/shared/lib/hooks/useToast';
import { useCreatePost } from '@/entities/Post/model/service/postService';
import { FORM_ID } from '../../const';

interface EditorProps {
  communityId: string;
}

type FormData = z.infer<typeof PostValidator>;

export function Editor({ communityId }: EditorProps) {
  const editorRef = useRef<EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      communityId,
      title: '',
      content: null
    }
  });

  const { mutate: onCreate } = useCreatePost();

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    const Embed = (await import('@editorjs/embed')).default;
    const Table = (await import('@editorjs/table')).default;
    const List = (await import('@editorjs/list')).default;
    const Code = (await import('@editorjs/code')).default;
    const LinkTool = (await import('@editorjs/link')).default;
    const InlineCode = (await import('@editorjs/inline-code')).default;
    const ImageTool = (await import('@editorjs/image')).default;

    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          editorRef.current = editor;
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: '/api/link'
            }
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const url = await uploadFile(file);

                  return {
                    success: 1,
                    file: {
                      url
                    }
                  };
                }
              }
            }
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed
        }
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [, value] of Object.entries(errors)) {
        value;
        toast({
          title: 'Something went wrong.',
          description: (value as { message: string }).message,
          variant: 'destructive'
        });
      }
    }
  }, [errors]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        if (_titleRef?.current) {
          _titleRef.current.focus();
        }
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        editorRef.current?.destroy();
        editorRef.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  async function onSubmit(data: FormData) {
    const blocks = await editorRef.current?.save();

    const payload: PostCreationRequest = {
      title: data.title,
      content: blocks,
      communityId
    };

    onCreate(payload);
  }

  if (!isMounted) {
    return null;
  }

  const { ref: titleRef, ...rest } = register('title');

  return (
    <div className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-4">
      <form id={FORM_ID} className="w-fit" onSubmit={handleSubmit(onSubmit)}>
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutoSize
            ref={(e) => {
              titleRef(e);
              // @ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-gray-500">
            Use{' '}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{' '}
            to open the command menu.
          </p>
        </div>
      </form>
    </div>
  );
}
