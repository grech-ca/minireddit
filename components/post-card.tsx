import { FC } from 'react';

import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from 'reactstrap';
import {
  BsFillChatFill as CommentIcon,
  BsFillHeartFill as LikeIcon,
} from 'react-icons/bs';

import { formatDistanceToNowStrict, parseISO, format } from 'date-fns';
import { ru } from 'date-fns/esm/locale';

export interface PostCardProps {
  
}

const thread = 'патриотишна';
const threadSlug = 'patriotishna';
const username = 'Username123';
const commentsCount = 14;
const likesCount = 158;
const createdAt = '2022-03-26T09:50:28.742Z';
const content = 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей.';
const postId = 123123;

export const PostCard: FC<PostCardProps> = ({  }) => {
  const postedAt = formatDistanceToNowStrict(
    parseISO(createdAt),
    { locale: ru, addSuffix: true },
  );

  const postedDate = format(
    parseISO(createdAt),
    'PPPp',
    { locale: ru }
  );

  return (
    <Link href={`/mr/${threadSlug}/${postId}`} passHref>
      <a
        onClick={e => e.stopPropagation()}
        className="w-100 text-decoration-none d-inline-flex"
        style={{ color: 'unset' }}
      >
        <Card>
          <CardHeader className="border-bottom-0 bg-transparent" style={{ fontSize: 12 }}>
            <b>мр/{thread}</b> • Опубликовал п/{username} <span title={postedDate}>{postedAt}</span>
          </CardHeader>
          <CardBody className="py-1">
            {content}
          </CardBody>
          <CardFooter style={{ fontSize: 12 }} className="d-flex gap-3 border-top-0 bg-transparent">
            <span className="d-flex gap-2 align-items-center">
              <LikeIcon className="text-danger" />
              {likesCount}
            </span>
            <span className="d-flex gap-2 align-items-center">
              <CommentIcon className="text-secondary" />
              {commentsCount}
            </span>
          </CardFooter>
        </Card>
      </a>
    </Link>
  );
};

