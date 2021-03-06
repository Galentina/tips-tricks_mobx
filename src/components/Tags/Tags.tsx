/* Core */
import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { TipViewMode } from '../../types';

/* Components */
import { Tag } from './Tag';

/* Other */
import { useStore, useTags } from '../../hooks';
import { fetchify } from '../../helpers';

export const Tags: FC<IPropTypes> = observer(({ tipViewMode }) => {
    const { tagStore } = useStore();
    const { data: tags, isFetchedAfterMount, isFetched } = useTags();

    const { selectedTagId, setSelectedTagId, setSelectedTagName } = tagStore;

    useEffect(() => {
        if (!selectedTagId && Array.isArray(tags)) {
            setSelectedTagId(tags[ 0 ].id);
            setSelectedTagName(tags[ 0 ].name);
        }
    }, [isFetchedAfterMount]);

    const handleTagClick = (id: string, name: string) => {
        setSelectedTagId(id);
        setSelectedTagName(name);
    };

    const tagsJSX = tags?.map((tag) => (
        <Link key = { tag.id } to = { '/topics-by-tag' }>
            <Tag
                { ...tag }
                dataActive = { tipViewMode === 'all-topics' || selectedTagId === tag.id }
                handleTagClick = { handleTagClick } />
        </Link>
    ));

    return <div className = 'tags'>{ fetchify(isFetched, tagsJSX) }</div>;
});

interface IPropTypes {
    tipViewMode: TipViewMode;
}
