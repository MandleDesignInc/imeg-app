<?php
/**
 * Created by Ryan Potsander
 * Date: 9/30/17
 */

class MyControllerRegions extends modRestController {
    public $classKey = 'modResource';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';

    /**
     * Abstract method for routing GET requests without a primary key passed. Must be defined in your derivative
     * controller. Handles fetching of collections of objects.
     *
     * @abstract
     * @return array
     */
    public function getList() {
        return $this->success('', $this->getProjects());
    }

    public function getProjects() {
        $tag = 'default';
        if (isset($_GET['tag'])) $tag = $_GET['tag'];

        $projectIds = $this->modx->getChildIds(28, 1, array('context' => 'web'));
        $projects = array();

        foreach ($projectIds as $id) {

            $tags = $this->getTags($id);

            if (!in_array($tag, $tags['services']) && !in_array($tag, $tags['markets'])) continue;

            array_push($projects, $this->getPartialProject($id));
        }

        $tagData = $this->getSelectedTagData($tag);


        $result = array();
        $result['projects'] = $projects;
        $result['headerImage'] = $tagData['headerImage'];
        $result['tag'] = $tagData['tag'];
        $result['content'] = $tagData['content'];

        return $result;

    }

    public function collection($list = array(), $total = false, $status = null) {

        return parent::collection($list, $total, $status);
    }


    public function read($id) {

        if (empty($id)) {
            return $this->failure($this->modx->lexicon('rest.err_field_ns',array(
                'field' => $this->primaryKeyField,
            )));
        }
        /** @var xPDOObject $object */
        $c = $this->getPrimaryKeyCriteria($id);
        $this->object = $this->modx->getObject($this->classKey,$c);
        if (empty($this->object)) {
            return $this->failure($this->modx->lexicon('rest.err_obj_nf',array(
                'class_key' => $this->classKey,
            )));
        }


        $objectArray = array();
        $objectArray['projects'] = $this->getFullProject($id);

        return $this->success('',$objectArray);
    }


    public function getTemplateVariable($id, $tvId, $richText = false) {

        $tv = $this->modx->getObject('modTemplateVarResource', array('tmplvarid' => $tvId, 'contentid' => $id));

        if ($tv) return $tv->get('value');

        return '';

    }

    public function formatTag($tag) {
        $pipesToCommas= str_replace('||', ',', $tag);
        $spaceToDashes = str_replace(' ', '-', strtolower($pipesToCommas));
        $lower = strtolower($spaceToDashes);
        return $lower;
    }

    public function getSelectedTagData($tag) {
        $tagList = array();
        $tagList['services'] = json_decode($this->getTemplateVariable(23, 32), true);
        $tagList['markets'] = json_decode($this->getTemplateVariable(24, 32), true);


        $result = array();
        $result['headerImage'] = 'default';
        $result['tag'] = 'default';
        $result['content'] = 'default';

        foreach ($tagList as $list) {
            foreach ($list as $item) {
                if ($this->formatTag($item['name']) == $tag) {
                    $result['headerImage'] = $item['image'];
                    $result['tag'] = $item['name'];
                    $result['content'] = $item['text'];

                    break 2;
                }
            }
        }

        return $result;
    }

    public function getTags($id) {
        $result = array();

        $result['services'] = explode(',', $this->formatTag($this->getTemplateVariable($id, 33)));
        $result['markets'] = explode(',', $this->formatTag($this->getTemplateVariable($id, 35)));

        foreach ($result as $item) {

            foreach ($item as $tag) {

                $this->formatTag($tag);
            }
        }

        return $result;
    }


    public function getPartialProject($id) {
        $page = $this->modx->getObject('modResource', $id);

        $project['id'] = $id;
        $project['title'] = $page->get('pagetitle');
        $project['previewImage'] = $this->getTemplateVariable($id, 31);
        $project['tags'] = $this->getTags($id);
        $project['path'] = str_replace(' ', '-', strtolower($page->get('pagetitle')));

        return $project;
    }

    // TODO: review and refactor, this assumes $this refers to the correct project
    public function getFullProject($id) {
        $project = array();

        $project['id'] = $id;
        $project['title'] = $this->object->pagetitle;
        $project['subtitle'] = $this->getTemplateVariable($id, 36, true);
        $project['alias'] = $this->object->alias;
        $project['content'] = $this->object->content;
        $project['headerImage'] = $this->getTemplateVariable($id, 25);
        $project['previewImage'] = $this->getTemplateVariable($id, 31);
        $project['location'] = $this->getTemplateVariable($id, 26);
        $project['size'] = $this->getTemplateVariable($id, 27);
        $project['sidebarContent'] = $this->getTemplateVariable($id, 28, true);
        $project['tags'] = $this->getTags($id);
        // $project['tag'] = $id;


        return $project;
    }



}
