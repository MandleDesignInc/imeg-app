<?php
/**
 * Created by Ryan Potsander
 * Date: 10/5/17
 */

class MyControllerAbout extends modRestController {
    public $classKey = 'modResource';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';
    public $primaryKeyField = 'id';


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
        $objectArray['callouts'] = $this->getCallouts($id);
        $objectArray['tiles'] = $this->getTiles($id);

        return $this->success('',$objectArray);
    }

    public function getCurrentPage($id) {

        $page = array();

        $page['id'] = $id;
        $page['title'] = $this->object->pagetitle;
        $page['alias'] = $this->object->alias;
        $page['content'] = $this->object->content;

        return $page;
    }

    public function getCallouts($id) {

        $callouts = array();

        $callouts[0]['title'] = $this->getTemplateVariable($id, 87);
        $callouts[0]['stat'] = $this->getTemplateVariable($id, 88);
        $callouts[1]['title'] = $this->getTemplateVariable($id, 89);
        $callouts[1]['stat'] = $this->getTemplateVariable($id, 90);
        $callouts[2]['title'] = $this->getTemplateVariable($id, 93);
        $callouts[2]['stat'] = $this->getTemplateVariable($id, 91);
        $callouts[3]['title'] = $this->getTemplateVariable($id, 94);
        $callouts[3]['stat'] = $this->getTemplateVariable($id, 92);

        return $callouts;
    }



    public function getTiles($id) {

        $tileIds = $this->modx->getChildIds($id, 1, array('context' => 'web'));

        $tiles = array();

        foreach ($tileIds as $tileId) array_push($tiles, $this->getTile($tileId));

        return $tiles;
    }

    public function getTile($id) {

        $uploadsPath = 'http://bluemandle2.com/~imeg/cms/assets/uploads/';



        $page = $this->modx->getObject('modResource', $id);

        $tile = array();
        $tile['id'] = $id;

        // base tile values
        $tile['columnSpan'] = $this->getTemplateVariable($id, 56);
        $tile['rowSpan'] = $this->getTemplateVariable($id, 57);

        $tile['title'] = $this->getTemplateVariable($id, 54);
        $tile['subtitle'] = $this->getTemplateVariable($id, 55);
        $tile['alias'] = $page->get('alias');




        $tile['backgroundImage'] = $this->getTemplateVariable($id, 53);
        if ($tile['backgroundImage'] != "") $tile['backgroundImage'] = $uploadsPath . $tile['backgroundImage'];

        $tile['backgroundColor'] = $this->getTemplateVariable($id, 52);


        return $tile;
    }


    public function getTemplateVariable($id, $tvId, $richText = false) {

        $tv = $this->modx->getObject('modTemplateVarResource', array('tmplvarid' => $tvId, 'contentid' => $id));

        if ($tv) return $tv->get('value');

        return '';

    }

}
