<?php
/**
 * Created by Ryan Potsander
 * Date: 10/5/17
 */

class MyControllerHome extends modRestController {
    public $classKey = 'modResource';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';


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
        $objectArray['page'] =  $this->getCurrentPage($id);
        $objectArray['tiles'] = $this->getTiles($id);

        return $this->success('',$objectArray);
    }

    public function getCurrentPage($id) {

        $page = array();

        $page['id'] = $id;
        $page['title'] = $this->object->pagetitle;
        $page['alias'] = $this->object->alias;

        return $page;
    }



    public function getTiles($id) {

        $tileIds = $this->modx->getChildIds($id, 1, array('context' => 'web'));

        $tiles = array();

        foreach ($tileIds as $tileId) array_push($tiles, $this->getTile($tileId));

        return $tiles;
    }

    public function getTile($id) {

        $uploadsPath = 'http://bluemandle2.com/~imeg/cms/assets/uploads/';

        $types = array(
            '12' => 'feature-tile',
            '13' => 'video-tile',
            '14' => 'project-spotlight-tile',
            '1000' => 'text-tile'
        );

        $page = $this->modx->getObject('modResource', $id);

        $tile = array();
        $tile['id'] = $id;
        $tile['type'] = $types[$page->get('template')];


        // base tile values
        $tile['columnSpan'] = $this->getTemplateVariable($id, 51);
        $tile['rowSpan'] = $this->getTemplateVariable($id, 50);

        $tile['title'] = $this->getTemplateVariable($id, 41);
        $tile['subtitle'] = $this->getTemplateVariable($id, 43);
        $tile['link'] = $this->getTemplateVariable($id, 40);



        if ($tile['type'] == $types['14']) {

            $spotlightMigx = json_decode($this->getTemplateVariable($id, 49), true);

            $spotlight = array();

            foreach ($spotlightMigx as $item) {

                $slide = array();
                $slide['id'] = $item['MIGX_id'];
                $slide['image'] = $item['image'];

                array_push($spotlight, $slide);
            }

            $tile['spotlight'] = $spotlight;
            return $tile;
        }



        $tile['backgroundImage'] = $this->getTemplateVariable($id, 45);
        if ($tile['backgroundImage'] != "") $tile['backgroundImage'] = $uploadsPath . $tile['backgroundImage'];

        $tile['backgroundColor'] = $this->getTemplateVariable($id, 46);

        if ($tile['type'] == $types['13']) {
            $tile['video'] = $this->getTemplateVariable($id, 44);
            return $tile;
        }

        // identify if text content is present - update type if it is
        $tile['content'] = $this->getTemplateVariable($id, 42);
        if ($tile['content'] != "") $tile['type'] = $types['1000'];


        return $tile;
    }


    public function getTemplateVariable($id, $tvId, $richText = false) {

        $tv = $this->modx->getObject('modTemplateVarResource', array('tmplvarid' => $tvId, 'contentid' => $id));

        if ($tv) return $tv->get('value');

        return '';

    }

    public function formatID($tag) {
        $pipesToCommas= str_replace('||', ',', $tag);

        return $pipesToCommas;
    }


    public function getProjectIds($id, $tvId) {

        $result = explode(',', $this->formatId($this->getTemplateVariable($id, $tvId)));

        foreach ($result as $item) {

            foreach ($item as $tag) {

                $this->formatTag($tag);
            }
        }

        return $result;
    }

    public function getFullProject($id) {

        $page = $this->modx->getObject('modResource', $id);

        $project = array();

        $project['id'] = $id;
        $project['title'] = $page->get('pagetitle');
        $project['subtitle'] = $this->getTemplateVariable($id, 36, true);
        $project['alias'] = $page->get('alias');
        $project['content'] = $page->get('content');
        $project['headerImage'] = $this->getTemplateVariable($id, 25);
        $project['previewImage'] = $this->getTemplateVariable($id, 31);
        $project['location'] = $this->getTemplateVariable($id, 26);
        $project['size'] = $this->getTemplateVariable($id, 27);
        $project['sidebarContent'] = $this->getTemplateVariable($id, 28, true);
        $project['tags'] = $this->getTags($id);


        return $project;
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

    public function formatTag($tag) {
        $pipesToCommas= str_replace('||', ',', $tag);
        $spaceToDashes = str_replace(' ', '-', strtolower($pipesToCommas));
        $lower = strtolower($spaceToDashes);
        return $lower;
    }

}